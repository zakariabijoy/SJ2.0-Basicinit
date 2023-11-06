using Amazon.S3.Model;
using Amazon.S3;
using Amazon.Textract.Model;
using Amazon.Textract;
using API.Interfaces;
using Amazon;
using Amazon.Runtime;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Services
{
    public class TextractService : ITextractService
    {
        private string _bucketname { get; set; }
        private RegionEndpoint _region { get; set; }
        private AmazonTextractClient _textractClient { get; set; }
        private AmazonS3Client _s3Client { get; set; }

        public TextractService()
        {
            _bucketname = "hnk-text-textract";
            _region = RegionEndpoint.APSouth1;
            _textractClient = new AmazonTextractClient(new BasicAWSCredentials("AKIA2SYTT3UJ7UZH7HRF", "7qts+qbJhNbDb31rC3frJjcSsvdQ8TXuhqJs0BST"),_region);
            _s3Client = new AmazonS3Client(new BasicAWSCredentials("AKIA2SYTT3UJ7UZH7HRF", "7qts+qbJhNbDb31rC3frJjcSsvdQ8TXuhqJs0BST"),_region);
        }


        /// <summary>
        /// text detection.
        /// </summary>
        /// <param name="filename">path to local file</param>
        public async Task DetectionText(string filename)
        {
            // Upload document to S3.

            var docLocation = await UploadFileToBucket(filename);

            // Start a document text detection job.

            Console.WriteLine("Starting document text detection job");
            var startJobRequest = new StartDocumentTextDetectionRequest { DocumentLocation = docLocation };
            var startJobResponse = await _textractClient.StartDocumentTextDetectionAsync(startJobRequest);
            Console.WriteLine($"Job ID: {startJobResponse.JobId}");

            // Wait for the job to complete.

            Console.Write("Waiting for job completion");
            var getResultsRequest = new GetDocumentTextDetectionRequest { JobId = startJobResponse.JobId };
            GetDocumentTextDetectionResponse getResultsResponse = null!;
            while ((getResultsResponse = await _textractClient.GetDocumentTextDetectionAsync(getResultsRequest)).JobStatus == JobStatus.IN_PROGRESS)
            {
                Console.Write("."); 
                Thread.Sleep(1000);
            }
            Console.WriteLine();

            // Display detected text blocks.

            if (getResultsResponse.JobStatus == JobStatus.SUCCEEDED)
            {
                Console.WriteLine("Detected text blocks:");
                do
                {
                    foreach (var block in getResultsResponse.Blocks)
                    {
                        Console.WriteLine($"Type {block.BlockType}, Text: {block.Text} ({block.Confidence:N0}%)");
                    }

                    if (string.IsNullOrEmpty(getResultsResponse.NextToken)) { break; }

                    getResultsRequest.NextToken = getResultsResponse.NextToken;
                    getResultsResponse = await _textractClient.GetDocumentTextDetectionAsync(getResultsRequest);

                } while (!string.IsNullOrEmpty(getResultsResponse.NextToken));
            }
            else
            {
                Console.WriteLine($"ERROR: job failed - {getResultsResponse.StatusMessage}");
            }
        }

        /// <summary>
        /// analyze text.
        /// </summary>
        /// <param name="filename">path to local file</param>
        public async Task AnalyzeText(string filename)
        {
            // Upload document to S3.

            var docLocation = await UploadFileToBucket(filename);

            var formValues = new List<KeyValuePair<string, string>>();
            
            var textractResult = await _textractClient.AnalyzeDocumentAsync(new AnalyzeDocumentRequest
            {
                Document = new Document
                {
                    S3Object = docLocation.S3Object
                },
                FeatureTypes = new List<string> { FeatureType.FORMS}
            });

            var keyValueElements  = (from x in textractResult.Blocks
                                     where x.BlockType == BlockType.KEY_VALUE_SET
                                     select x).ToArray();

            foreach (var keyValueElement in keyValueElements)
            {
                StringBuilder keyName = new();
                StringBuilder valueResult = new();

                var keyIdblock = (from k in keyValueElement.Relationships
                                  where k.Type == RelationshipType.CHILD
                                  select k).FirstOrDefault();

                var valueIdblock = (from k in keyValueElement.Relationships
                                  where k.Type == RelationshipType.VALUE
                                  select k).FirstOrDefault();

                if (keyIdblock != null)
                {
                    foreach (var keyId in keyIdblock.Ids)
                    {
                        var keyElelment = (from k in textractResult.Blocks
                                           where k.Id == keyId
                                           select k).FirstOrDefault();
                        
                        keyName.Append(keyElelment.Text + " ");
                    }
                }

                if (valueIdblock != null)
                {
                    var valueElement = (from x in textractResult.Blocks
                                        where x.Id == valueIdblock.Ids[0]
                                        select x).FirstOrDefault();

                    if(valueElement.Relationships.Count > 0)
                    {
                        foreach (var valuePart in valueElement.Relationships[0].Ids)
                        {
                            var valuePartBlock = (from x in textractResult.Blocks
                                                  where x.Id == valuePart
                                                  select x).FirstOrDefault();

                            valueResult.Append(valuePartBlock.Text + " ");  
                        }
                    }
                }

                string formKey = keyName.ToString();
                string formValue = valueResult.ToString();
                
                if(!string.IsNullOrEmpty(formKey) && !string.IsNullOrEmpty(formValue))
                {
                    formValues.Add(new KeyValuePair<string, string>( formKey, formValue ) );
                }
            }

            foreach (var item in formValues)
            {
                Console.WriteLine( $"key: {item.Key}, Value: {item.Value} ");
            }
        }


        /// <summary>
        /// Upload local file to S3 bucket.
        /// </summary>
        /// <param name="filename"></param>
        /// <returns>DocumentLocation object, suitable for inclusion in Textract start job requests.</returns>
        private async Task<DocumentLocation> UploadFileToBucket(string filename)
        {
            Console.WriteLine($"Upload {filename} to {_bucketname} bucket");
            var putRequest = new PutObjectRequest
            {
                BucketName = _bucketname,
                FilePath = filename,
                Key = Path.GetFileName(filename)
            };
            await _s3Client.PutObjectAsync(putRequest);
            return new DocumentLocation
            {
                S3Object = new Amazon.Textract.Model.S3Object
                {
                    Bucket = _bucketname,
                    Name = putRequest.Key
                }
            };
        }

        
    }

}
