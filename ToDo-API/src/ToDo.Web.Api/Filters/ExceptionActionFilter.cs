using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using ToDo.Infra.Core;

namespace ToDo.Web.Api.Filters
{
    public class ExceptionActionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var response = context.HttpContext.Response;
            response.ContentType = "application/json";

            if (context.Exception is BusinessException business)
            {
                response.StatusCode = (int)business.StatusCode;
            }
            else
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }

            context.Result = new JsonResult(context.Exception.Message);
        }
    }
}