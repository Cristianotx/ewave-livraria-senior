using System.ComponentModel;

namespace ToDo.Domain.Enums
{
    public enum EEmailTipo
    {
        [Description("Principal")]
        Principal = 1,

        [Description("Particular")]
        Particular = 2,

        [Description("Comercial")]
        Comercial = 3
    }
}