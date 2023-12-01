export default function Navbar() {
  return (
    <>
      <nav>
        <div className="h-[80px] bg-[#1B262C] text-white flex items-center justify-between px-12">
          <div>
            <h1 className="text-3xl font-bold">RunMate</h1>
          </div>
          <div>
            <input
              type="search"
              className="rounded-full bg-[#0F4C75] px-4 py-1"
              placeholder="Search"
            />
          </div>
          <div className="space-x-6">
            <button className="bg-[#0F4C75] px-4 py-2 rounded-lg font-medium">
              Logout
            </button>
            <button className="bg-[#0F4C75] px-4 py-2 rounded-lg font-medium">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
