using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.Helpers;
using API.Extensions;
using System.Text.Json;

namespace API.Controllers;

public class FileUploadController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<FileUploadController> _logger;
    private readonly IFileService _fileService;
    private readonly ITextractService _textractService;

    public FileUploadController( IUnitOfWork unitOfWork, ILogger<FileUploadController> logger, IFileService fileService, ITextractService textractService)
    {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _fileService = fileService;
        _textractService = textractService;
    }

    [HttpPost("Upload-File")]
    public async Task<ActionResult<FileContentDto>> UploadPhoto(IFormFile file, [FromQuery] Guid? id)
    {
        try
        {
            if (file.Length > 0)
            {
               (string fileName, string filePath) =  _fileService.UploadFile(file);

                await _textractService.AnalyzeText(filePath);

                var fileContentDto = new FileContentDto
                {
                    Id = Guid.NewGuid(),
                    InvoiceNo = Guid.NewGuid().ToString(),
                    Building = "Test Building",
                    ElectricityBill = 100.00,
                    Url = fileName
                };

                if (id != null)
                {
                    var fileContentFromDb = await _unitOfWork.FileContentRepository.GetFileContentById(id.Value);
                    fileContentDto.Id = fileContentFromDb.Id;
                }

                return Ok(fileContentDto);
            }
            else
            {
                return BadRequest("Problem uploading file");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return BadRequest("Problem uploading file");
        }
        
    }

    [HttpPost("upsert-file-content")]
    public async Task<ActionResult<bool>> UpsertFileContent(FileContentDto fileContent)
    {
        var username = HttpContext.User.GetUsername();
        fileContent.ModifiedBy = username;

        var fileContentFromDb = await _unitOfWork.FileContentRepository.GetFileContentById(fileContent.Id);
        if(fileContentFromDb == null)
        {
            fileContent.CreatedBy = username;
            
            _fileService.UpsertFile(fileContent);
            await _unitOfWork.FileContentRepository.AddAsync(fileContent);

            return Ok(await _unitOfWork.Complete());
        }
        else
        {
            fileContentFromDb.InvoiceNo = fileContent.InvoiceNo;
            fileContentFromDb.Building = fileContent.Building;
            fileContentFromDb.ElectricityBill = fileContent.ElectricityBill;
            fileContentFromDb.ModifiedBy = fileContent.ModifiedBy;
            fileContentFromDb.ModifiedDate = fileContent.ModifiedDate;

            fileContent.CreatedBy = fileContentFromDb.CreatedBy;
            fileContent.CreatedDate = fileContentFromDb.CreatedDate;

            _fileService.UpsertFile(fileContent);

            return Ok(await _unitOfWork.Complete());
        }
    }

    [HttpGet("file-contents")]
    public async Task<ActionResult<PagedList<FileContentDto>>> GetFileContents([FromQuery] PaginationParams paginationParams)
    {
        var fileContents = await _unitOfWork.FileContentRepository.GetFileContentsAsync(paginationParams);

        Response.AddPaginationHeader(new PaginationHeader(fileContents.CurrentPage, fileContents.PageSize,
            fileContents.TotalCount, fileContents.TotalPages));

        return Ok(fileContents);
    }

    [HttpGet("file-content-by-id")]
    public async Task<ActionResult<PagedList<FileContentDto>>> GetFileContentById([FromQuery] Guid id)
    {
        var fileContents = await _unitOfWork.FileContentRepository.GetFileContentById(id);

        return Ok(fileContents);
    }

    [HttpDelete("delete-file-content-by-id")]
    public async Task<ActionResult<bool>> DeleteFileContentById([FromQuery] Guid id)
    {
        _fileService.DeleteFileContentById(id);
        await _unitOfWork.FileContentRepository.DeleteFileContentById(id);
        return Ok(await _unitOfWork.Complete());
    }
}
