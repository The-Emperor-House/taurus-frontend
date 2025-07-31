import UserProfileCard from '../../components/user/UserProfileCard';

export default function DashboardPage() {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <UserProfileCard className="w-full max-w-3xl" />
      </div>
  );
}
