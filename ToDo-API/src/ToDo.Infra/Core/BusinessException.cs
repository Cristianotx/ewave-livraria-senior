using System;
using System.Net;

namespace ToDo.Infra.Core
{
    public abstract class BusinessException : ArgumentException
    {
        public override string Message { get; }

        public HttpStatusCode StatusCode { get; }

        protected BusinessException(string message)
        {
            Message = message;
            StatusCode = HttpStatusCode.BadRequest;
        }

        protected BusinessException(string message, HttpStatusCode statusCode) : this(message)
        {
            StatusCode = statusCode;
        }
    }
}