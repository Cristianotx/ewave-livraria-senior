using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Infra.Core;
using ToDo.Infra.Extensions;

namespace ToDo.Infra.EF.Data
{
    public class Repository : IRepository
    {
        public readonly ToDoContext DbContext;

        public Repository(ToDoContext dbContext)
        {
            DbContext = dbContext;
        }

        public virtual async Task AddAsync<TEntity>(TEntity entity) where TEntity : Entity
        {
            await DbContext.Set<TEntity>().AddAsync(entity);
        }

        public async Task<TEntity> GetByAsync<TEntity>(int id) where TEntity : Entity
        {
            var entity = DbContext.Set<TEntity>().Local.SingleOrDefault(e => e.Id == id);
            return entity ?? await DbContext.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == id);
        }

        public async Task<TEntity> GetByAsync<TEntity>(Guid aggregateId) where TEntity : Entity
        {
            var entity = DbContext.Set<TEntity>().Local.SingleOrDefault(e => e.AggregateId == aggregateId);
            return entity ?? await DbContext.Set<TEntity>().SingleOrDefaultAsync(e => e.AggregateId == aggregateId);
        }

        public virtual async Task RemoverAsync<T>(Guid aggregateId) where T : class
        {
            var entity = await DbContext.Set<T>().FindAsync(aggregateId);
            if (entity.IsNotNull())
            {
                DbContext.Remove(entity);
            }
        }

        public virtual async Task RemoverAsync<T>(int id) where T : class
        {
            var entity = await DbContext.Set<T>().FindAsync(id);
            if (entity.IsNotNull())
            {
                DbContext.Remove(entity);
            }
        }
    }
}
