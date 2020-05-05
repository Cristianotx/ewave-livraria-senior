using System;
using System.Threading.Tasks;
using ToDo.Infra.Core;

namespace ToDo.Infra.EF.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ToDoContext _toDoContext;

        public UnitOfWork(ToDoContext toDoContext)
        {
            _toDoContext = toDoContext;
        }

        public async Task CommitAsyc()
        {
            try
            {
                await _toDoContext.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                Dispose();
            }
        }

        public void Dispose()
        {
            _toDoContext.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
