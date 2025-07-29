# Build stage
FROM openjdk:24-jdk AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src
COPY .mvn ./.mvn
COPY mvnw .

RUN chmod +x mvnw && ./mvnw clean package -DskipTests -e

# Run stage
FROM openjdk:24-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]