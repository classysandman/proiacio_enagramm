using Microsoft.EntityFrameworkCore;
using MoneyTransfer.Api.Data;
using MoneyTransfer.Api.Models;

namespace MoneyTransfer.Api.Services;

public class TransferService
{
    private readonly AppDbContext _db;

    public TransferService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<TransferResult> TransferAsync(int fromAccountId, int toAccountId, decimal amount)
    {
        if (amount <= 0)
            return TransferResult.Fail("Transfer amount must be positive.");

        if (fromAccountId == toAccountId)
            return TransferResult.Fail("Cannot transfer to the same account.");

        using var transaction = await _db.Database.BeginTransactionAsync();

        var fromAccount = await _db.Accounts.FirstOrDefaultAsync(a => a.Id == fromAccountId);
        var toAccount = await _db.Accounts.FirstOrDefaultAsync(a => a.Id == toAccountId);

        if (fromAccount == null || toAccount == null)
            return TransferResult.Fail("One or both accounts do not exist.");

        if (fromAccount.Balance < amount)
            return TransferResult.Fail("Insufficient balance.");

        fromAccount.Balance -= amount;
        toAccount.Balance += amount;

        _db.Transactions.Add(new Transaction
        {
            FromAccountId = fromAccountId,
            ToAccountId = toAccountId,
            Amount = amount,
            Timestamp = DateTime.UtcNow
        });

        await _db.SaveChangesAsync();
        await transaction.CommitAsync();

        return TransferResult.Success();
    }
}

public class TransferResult
{
    public bool Succeeded { get; set; }
    public string? Error { get; set; }

    public static TransferResult Success() => new() { Succeeded = true };
    public static TransferResult Fail(string error) => new() { Succeeded = false, Error = error };
}