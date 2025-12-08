import userService from "@/services/users-service";

import UserTable from "./table";

export default async function Page() {
  const users = await userService.getUsers({});

  return (
    <div>
      <UserTable data={users} name="User" />
    </div>
  );
}
