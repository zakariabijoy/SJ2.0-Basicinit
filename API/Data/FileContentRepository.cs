using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FileContentRepository : IFileContentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public FileContentRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<PagedList<FileContentDto>> GetFileContentsAsync(PaginationParams paginationParams)
        {
            var query = _context.FileContents.AsQueryable();

            if(!string.IsNullOrEmpty(paginationParams.SearchTerm) && !string.IsNullOrWhiteSpace(paginationParams.SearchTerm))
                query = query.Where(x => x.InvoiceNo.ToLower().Contains(paginationParams.SearchTerm.ToLower()) || x.Building.ToLower().Contains(paginationParams.SearchTerm.ToLower()));

            query = query.OrderByDescending(x => x.ModifiedDate);

            return await PagedList<FileContentDto>.CreateAsync(
                query.AsNoTracking().ProjectTo<FileContentDto>(_mapper.ConfigurationProvider),
                paginationParams.PageNumber,
                paginationParams.PageSize);
        }

        public async Task<FileContent> GetFileContentById(Guid id)
        {
            return await _context.FileContents.FindAsync(id);
        }

        public async Task AddAsync(FileContentDto fileContentDto)
        {
           await _context.FileContents.AddAsync(_mapper.Map<FileContent>(fileContentDto));
        }

        public async Task DeleteFileContentById(Guid id)
        {
            var fileContent = await GetFileContentById(id);
            _context.FileContents.Remove(fileContent);
        }
    }
}