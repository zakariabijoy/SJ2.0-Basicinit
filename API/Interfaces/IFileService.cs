using API.DTOs;

namespace API.Interfaces
{
    public interface IFileService
    {
        (string filename, string filePath) UploadFile(IFormFile file);
        bool DeleteFileContentById(Guid id);
        bool UpsertFile(FileContentDto fileContent);    
    }
}