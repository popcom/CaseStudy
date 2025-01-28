﻿namespace BookStore.Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    Task<int> SaveChangesAsync();

    int SaveChanges();
}
