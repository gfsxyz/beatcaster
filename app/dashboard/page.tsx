import { Combobox } from "@/components/Combobox";
import { Navbar } from "@/components/Nav";
import Overview from "@/components/Overview";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Dashboard = async () => {
  const OPTIONS_SIZE = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];
  return (
    <div className="max-w-7xl mx-auto min-h-screen py-8 space-y-12">
      <Navbar />

      <main className="flex justify-between px-4">
        <h1 className="sr-only">Dashboard</h1>
        <div className="space-y-6">
          <h2 className="font-semibold text-lg">Options</h2>
          <div className="flex gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="Title" />
                <Label htmlFor="Title">Title</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="Artists" />
                <Label htmlFor="Artists">Artists</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="AlbumCover" />
                <Label htmlFor="AlbumCover">Album Cover</Label>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="Timestamp" />
                <Label htmlFor="Timestamp">Timestamp</Label>
              </div>
              <div className="flex items-center space-x-2 -mb-2.5">
                <Label>Size: </Label>
                <Combobox
                  options={OPTIONS_SIZE}
                  hideSearch
                  initialValues="medium"
                />
              </div>
            </div>
          </div>

          {/* Will work on styles later */}
          {/* <h2 className="font-semibold pt-4 text-lg">Styles</h2>
          <div className="flex gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold">Fonts:</h3>
              <div className="flex items-center space-x-2">
                <Label>Font-family: </Label>
                <Combobox
                  options={OPTIONS_SIZE}
                  hideSearch
                  initialValues="medium"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="AlbumCover" />
                <Label htmlFor="AlbumCover">Album Cover</Label>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <h3 className="font-semibold">Outlines:</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="Timestamp" />
                <Label htmlFor="Timestamp">Timestamp</Label>
              </div>
              <div className="flex items-center space-x-2 -mb-2.5">
                <Label>Size: </Label>
                <Combobox
                  options={OPTIONS_SIZE}
                  hideSearch
                  initialValues="medium"
                />
              </div>
            </div>
          </div> */}
        </div>
        <Overview />
      </main>
    </div>
  );
};
export default Dashboard;
