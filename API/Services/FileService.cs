using API.DTOs;
using API.Entities;
using API.Interfaces;
using System.Text.Json;

namespace API.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FileService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public bool DeleteFileContentById(Guid id)
        {
            var contentFolderName = Path.Combine("Uploads", "FileContents");
            var contentFileName = $"{id}.csv";
            var Contentfilepath = Path.Combine(_webHostEnvironment.WebRootPath, contentFolderName, contentFileName);

            if (_webHostEnvironment.EnvironmentName != "Development")
                Contentfilepath = Contentfilepath.Replace(@"\", "/");

            FileInfo file = new FileInfo(Contentfilepath);
            if (file.Exists)
            {
                file.Delete();
            }

            return true;
        }

        public (string filename, string filePath) UploadFile(IFormFile file)
        {
            var folderName = Path.Combine("Uploads", "Files");
            var pathToSave = Path.Combine(_webHostEnvironment.WebRootPath, folderName);
            var fileName = $"{Guid.NewGuid()}_{file.FileName.Trim()}";
            var fullPath = Path.Combine(pathToSave, fileName);

            if (_webHostEnvironment.EnvironmentName != "Development")
                fullPath = fullPath.Replace(@"\", "/");

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return (fileName, fullPath);
        }

        public bool UpsertFile(FileContentDto fileContent)
        {
            var contentFolderName = Path.Combine("Uploads", "FileContents");
            var contentFileName = $"{fileContent.Id}.csv";
            var Contentfilepath = Path.Combine(_webHostEnvironment.WebRootPath, contentFolderName, contentFileName);

            if (_webHostEnvironment.EnvironmentName != "Development")
                Contentfilepath = Contentfilepath.Replace(@"\", "/");

            using (StreamWriter writer = new StreamWriter(new FileStream(Contentfilepath, FileMode.Create, FileAccess.Write)))
            {
                writer.WriteLine(JsonSerializer.Serialize(fileContent));
            }

            return true;
        }
    }
}