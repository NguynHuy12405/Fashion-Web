import { Search, Edit, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../../stores/useAuthStore';
import { useState } from 'react';
import EditUser from '../componentAdmin/EditUser';

export default function UserManager() {
  const users = useAuthStore((s) => s.users);
  const updateUser = useAuthStore((s) => s.updateUser);
  const deleteUser = useAuthStore((s) => s.deleteUser);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    updateUser(updatedUser);
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Bạn có chắc muốn xóa user này?")) {
      deleteUser(userId);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
          <p className="text-sm text-gray-500 mt-1">Danh sách tất cả thành viên trong hệ thống</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên, email..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
            <option>Tất cả quyền</option>
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Thành viên</th>
                <th className="px-6 py-4">Quyền hạn</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt="" className="w-10 h-10 rounded-full border border-gray-200" />
                      <div>
                        <div className="font-medium text-gray-800">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status === 'Active' ? 'Hoạt động' : user.status === 'Inactive' ? 'Ngoại tuyến' : 'Đã khóa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditClick(user)}
                        className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition cursor-pointer"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <span>Hiện Có Tổng User: {users.length}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer" disabled>Trước</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50 cursor-pointer">Sau</button>
          </div>
        </div>
      </div>
      <EditUser 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        user={selectedUser} 
        onSave={handleSaveUser} 
      />
    </div>
  );
}
