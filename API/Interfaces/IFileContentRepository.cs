using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IFileContentRepository
    {
        Task AddAsync(FileContentDto fileContentDto);
        Task<FileContent> GetFileContentById(Guid id);
        Task DeleteFileContentById(Guid id);
        Task<PagedList<FileContentDto>> GetFileContentsAsync(PaginationParams paginationParams);
    }
}