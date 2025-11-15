FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app
COPY target/gateway-servise-0.0.1-SNAPSHOT.jar api-gateway.jar
EXPOSE 8888
ENTRYPOINT ["java", "-jar", "api-gateway.jar"]
