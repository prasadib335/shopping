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


//  @PutMapping("/{id}")
//     public String updateUser(
//             @PathVariable int id,
//             @RequestBody UserRequestDto dto) {

//         return userService.upDateUser(id, dto);
//     }