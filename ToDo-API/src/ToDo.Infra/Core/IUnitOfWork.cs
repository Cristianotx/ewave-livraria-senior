using System;
using System.Threading.Tasks;

namespace ToDo.Infra.Core
{
    public interface IUnitOfWork : IDisposable
    {
        Task CommitAsyc();
    }
}
