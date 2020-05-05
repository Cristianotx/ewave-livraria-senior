using Microsoft.AspNetCore.Mvc;
using ToDo.Infra.Core;
using ToDo.Web.Api.Filters;

namespace ToDo.Web.Api.Configs
{
    [ExceptionActionFilter]
    public class ApiBaseController : ControllerBase
    {
        protected readonly IUnitOfWork UnitOfWork;

        public ApiBaseController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }
    }
}