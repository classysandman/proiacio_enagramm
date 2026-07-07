using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyTransfer.Api.Data;
using MoneyTransfer.Api.Services;

namespace MoneyTransfer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly TransferService _transferService;

    public AccountsController(AppDbContext db, TransferService transferService)
    {
        _db = db;
        _transferService = transferService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAccounts()
    {
        var accounts = await _db.Accounts.ToListAsync();
        return Ok(accounts);
    }

    [HttpGet("transactions")]
    public async Task<IActionResult> GetTransactions()
    {
        var transactions = await _db.Transactions
            .OrderByDescending(t => t.Timestamp)
            .ToListAsync();
        return Ok(transactions);
    }

    [HttpPost("transfer")]
    public async Task<IActionResult> Transfer([FromBody] TransferRequest request)
    {
        var result = await _transferService.TransferAsync(
            request.FromAccountId, request.ToAccountId, request.Amount);

        if (!result.Succeeded)
            return BadRequest(new { error = result.Error });

        return Ok(new { message = "Transfer successful." });
    }
}

public class TransferRequest
{
    public int FromAccountId { get; set; }
    public int ToAccountId { get; set; }
    public decimal Amount { get; set; }
}