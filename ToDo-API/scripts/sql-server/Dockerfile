FROM mcr.microsoft.com/mssql/server:2019-latest

EXPOSE 1433

ENV ACCEPT_EULA=${ACCEPT_EULA:-Y}
ENV SA_PASSWORD=${SA_PASSWORD:-Dd8f6fDZ}
ENV DATABASE=${DATABASE:-ToDo}

COPY ./ToDo-API/scripts/sql-server/ /
ENTRYPOINT [ "/bin/bash", "./entrypoint.sh" ]
CMD [ "/opt/mssql/bin/sqlservr" ]