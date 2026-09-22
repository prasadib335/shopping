import api from "./axios";
import type { LoginRequest, RegisterUser, UpdateUser, User } from "../types/User";

export async function userRegistration(userData : RegisterUser) : Promise<string> {
           const response = await api.post<string>(
               "/user",
                userData
         );

         return response.data;
}

export async function userLogin(userData : LoginRequest) : Promise<string>{
          const response = await api.post<string>(
              "/user/login",
               userData
        );

        return response.data;
        
}

export async function getUser(userId : number) : Promise<User> {
     const response = await api.get<User>(
         `/user/${userId}`
       );

       return response.data;
       
}

export async function updateUser(
      userId : number,
      userData : UpdateUser
) : Promise<string> {
    const response = await api.put<string>(
        `/user/${userId}`,
            userData
      );

      return response.data;

}

export async function getUsers() : Promise<User[]> {
      const response = await api.get<User[]>(
          "/user"
       );

      console.log("USERS FROM BACKEND:", response.data);

       return response.data;
}

export async function getActiveUsers() : Promise<User[]>{
      const response = await api.get<User[]>(
          "/user/activeusers"

       );

       return response.data;
}

export async function getInactiveUsers(): Promise<User[]> {
    const response = await api.get<User[]>(
        "/user/inactiveusers"
    );

    return response.data;
}

export async function deleteUser(userId: number): Promise<string> {
    const response = await api.patch<string>(
        `/user/${userId}/delete`
    );

    return response.data;
}

export async function deactivateUser(userId: number): Promise<string> {
    const response = await api.patch<string>(
        `/user/${userId}/deactivate`
    );

    return response.data;
}

export async function activateUser(userId: number): Promise<string> {
    const response = await api.patch<string>(
        `/user/${userId}/activate`
    );

    return response.data;
}


