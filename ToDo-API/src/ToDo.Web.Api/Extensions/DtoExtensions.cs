using System;
using System.Collections.Generic;
using System.Linq;
using ToDo.Web.Api.Dtos;

namespace ToDo.Web.Api.Extensions
{
    public static class DtoExtensions
    {
        public static List<Tuple<int, string>> ToTuple(this IEnumerable<TelefoneDto> source)
        {
            return source?.Select(s => Tuple.Create(s.TipoId, s.Numero))?.ToList();
        }

        public static List<Tuple<int, string>> ToTuple(this IEnumerable<EmailDto> source)
        {
            return source?.Select(s => Tuple.Create(s.TipoId, s.Endereco))?.ToList();
        }
    }
}