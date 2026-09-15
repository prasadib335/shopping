import axios from "axios";
import type { LoginRequest, RegisterUser, UpdateUser, User } from "../types/User";

export async function userRegistration(userData : RegisterUser) : Promise<string> {
         const response = await axios.post<string>(
               "http://localhost:8080/user",
                userData
         );

         return response.data;
}

export async function userLogin(userData : LoginRequest) : Promise<string>{
        const response = await axios.post<string>(
              "http://localhost:8080/user/login",
               userData
        );

        return response.data;
        
}

export async function getUser(userId : number) : Promise<User> {
       const response = await axios.get<User>(
             `http://localhost:8080/user/${userId}`
       );

       return response.data;
       
}

export async function updateUser(
      userId : number,
      userData : UpdateUser
) : Promise<string> {
      const response = await axios.put<string>(
            `http://localhost:8080/user/${userId}`,
            userData
      );

      return response.data;

}

export async function getUsers() : Promise<User[]> {
       const response = await axios.get<User[]>(
            "http://localhost:8080/user"
       );

      console.log("USERS FROM BACKEND:", response.data);

       return response.data;
}

export async function getActiveUsers() : Promise<User[]>{
       const response = await axios.get<User[]>(
            "http://localhost:8080/user/activeusers"

       );

       return response.data;
}

export async function getInactiveUsers(): Promise<User[]> {
    const response = await axios.get<User[]>(
        "http://localhost:8080/user/inactiveusers"
    );

    return response.data;
}

export async function deleteUser(userId: number): Promise<string> {
    const response = await axios.patch<string>(
        `http://localhost:8080/user/${userId}/delete`
    );

    return response.data;
}

export async function deactivateUser(userId: number): Promise<string> {
    const response = await axios.patch<string>(
        `http://localhost:8080/user/${userId}/deactivate`
    );

    return response.data;
}

export async function activateUser(userId: number): Promise<string> {
    const response = await axios.patch<string>(
        `http://localhost:8080/user/${userId}/activate`
    );

    return response.data;
}


