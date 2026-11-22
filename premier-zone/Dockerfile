# Builds and runs the Premier Zone API. Most hosts (Render, Railway, Fly.io) can deploy straight from this file.
# Set DB_URL, DB_USERNAME, DB_PASSWORD and CORS_ORIGINS in the host's environment settings.
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN ./mvnw -q -DskipTests dependency:go-offline
COPY src src
RUN ./mvnw -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENV SHOW_SQL=false
# Free hosting tiers have ~512 MB of memory; keep the JVM inside it.
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75"
EXPOSE 8081
CMD ["java", "-jar", "app.jar"]
