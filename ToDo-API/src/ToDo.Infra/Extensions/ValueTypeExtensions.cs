namespace ToDo.Infra.Extensions
{
    public static class ValueTypeExtensions
    {
        /// <summary>
        /// Verifica se o objeto é Nulo
        /// </summary>
        /// <param name="value">Um valor para a verificação.</param>
        /// <returns>Valor boleano</returns>
        public static bool IsNull<T>(this T value) => value == null;

        /// <summary>
        /// Verifica se o objeto não é Nulo
        /// </summary>
        /// <param name="value">Um valor para a verificação.</param>
        /// <returns>Valor boleano</returns>
        public static bool IsNotNull<T>(this T value) => !value.IsNull();
        
        /// <summary>
        /// Verifica se a string informada é vazia, nula ou espaço.
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        public static bool IsNullOrWhiteSpace(this string source) => string.IsNullOrWhiteSpace(source);

        /// <summary>
        /// Verifica se o valor é falso
        /// </summary>
        /// <param name="boolean">O Parâmetro para a verificação.</param>
        /// <returns>Valor boleano</returns>
        public static bool IsFalse(this bool boolean) => boolean.Equals(false);
    }
}