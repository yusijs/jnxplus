import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val javaVersion: String by project

plugins {
	id("org.springframework.boot") apply false
	id("io.spring.dependency-management")
  id("org.jetbrains.kotlin.jvm")
  id("org.jetbrains.kotlin.plugin.spring")
}

group = "<%= groupId %>"
version = "<%= projectVersion %>"
java.sourceCompatibility = JavaVersion.toVersion(javaVersion)

repositories {
	mavenCentral()
}

dependencyManagement {
  imports {
    mavenBom(org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES)
  }
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
  kotlinOptions {
    freeCompilerArgs = listOf("-Xjsr305=strict")
    jvmTarget = javaVersion
  }
}

tasks.withType<Test> {
  useJUnitPlatform()
}
