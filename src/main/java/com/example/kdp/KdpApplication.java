package com.example.kdp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class KdpApplication {

	public static void main(String[] args) {
		ApplicationContext context =  SpringApplication.run(KdpApplication.class, args);
		Test test = context.getBean(Test.class);
		test.test();
	}

}
