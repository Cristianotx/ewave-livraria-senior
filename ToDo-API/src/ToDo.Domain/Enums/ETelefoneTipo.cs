using System.ComponentModel;

namespace ToDo.Domain.Enums
{
    public enum ETelefoneTipo
    {
        [Description("Celular")]
        Celular = 1,

        [Description("Residencial")]
        Residencial = 2,

        [Description("Comercial")]
        Comercial = 3
    }
}