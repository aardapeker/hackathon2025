# Build stage
FROM eclipse-temurin:24-jdk AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src
COPY .mvn ./.mvn
COPY mvnw .

RUN chmod +x mvnw && ./mvnw clean package -DskipTests -e

# Run stage
FROM eclipse-temurin:24-jdk
WORKDIR /app

# Install FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Verify FFmpeg installation
RUN ffmpeg -version

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]