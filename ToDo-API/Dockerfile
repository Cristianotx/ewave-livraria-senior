FROM mcr.microsoft.com/dotnet/core/sdk:3.1-bionic AS build-env
WORKDIR /app
EXPOSE 80


COPY . ./
RUN dotnet restore
RUN dotnet publish ./src/ToDo.Web.Api/ToDo.Web.Api.csproj -c Release -o ./src/ToDo.Web.Api/out --no-restore

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-bionic AS runtime
WORKDIR /app
COPY --from=build-env /app/src/ToDo.Web.Api/out ./

ENTRYPOINT ["dotnet", "ToDo.Web.Api.dll"]