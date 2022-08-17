FROM openjdk:18

ENV ENVIRONMENT=prod

LABEL maintainer="claudia.dreifke@gmail.com"

ADD backend/target/kpiBoard.jar kpiBoard.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -jar /kpiBoard.jar" ]
