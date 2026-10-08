package com.example.kdp.config;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.filter.CorsFilter;

class CorsConfigTest {

    @Test
    void allowsPreflightFromDeployedFrontend() throws Exception {
        CorsFilter filter = new CorsConfig().corsFilter();
        MockHttpServletRequest request = new MockHttpServletRequest("OPTIONS", "/user/login");
        request.addHeader("Origin", "https://shopping-frontend-ui.onrender.com");
        request.addHeader("Access-Control-Request-Method", "POST");
        request.addHeader("Access-Control-Request-Headers", "content-type");

        MockHttpServletResponse response = new MockHttpServletResponse();
        MockFilterChain chain = new MockFilterChain();
        filter.doFilter(request, response, chain);

        assertEquals(200, response.getStatus());
        assertEquals("https://shopping-frontend-ui.onrender.com",
                response.getHeader("Access-Control-Allow-Origin"));
        assertTrue(response.getHeader("Access-Control-Allow-Methods").contains("POST"));
        assertTrue(chain.getRequest() == null);
    }
}
