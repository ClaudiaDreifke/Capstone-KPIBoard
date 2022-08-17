FROM openjdk:18

ENV ENVIRONMENT=prod

LABEL maintainer="xx@web.de"

ADD backend/target/kpiBoard.jar kpiBoard.jar

CMD [ "sh", "-c", "java -jar /kpiBoard.jar" ]