import { useAuthStore } from "../../stores/useAuthStore";

export default function Profile() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <img 
        src={user.avatar} 
        alt={user.name} 
        className="w-24 h-24 rounded-full object-cover"
      />
      <h1 className="text-xl font-semibold">Profile: {user.name}</h1>
      <span className="text-gray-600">Email: {user.email}</span>
    </div>
  );
}
