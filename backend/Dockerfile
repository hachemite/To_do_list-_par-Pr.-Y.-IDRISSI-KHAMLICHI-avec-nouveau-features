# STAGE 1: Build
# We use a Maven image with JDK 17 to compile the project
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Optimization: Copy pom.xml first and download dependencies.
# This layer will be cached if pom.xml doesn't change.
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build
COPY src ./src
# We skip tests in the build phase for speed, assuming CI pipeline handled them
RUN mvn clean package -DskipTests

# STAGE 2: Runtime
# We use a smaller JRE image (Alpine Linux) for the final container
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create a non-root user for security (SecOps Best Practice)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port defined in application.properties
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]