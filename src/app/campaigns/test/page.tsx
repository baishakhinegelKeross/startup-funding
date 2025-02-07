"use client"

import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Test() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [select1, setSelect1] = useState("banana");
  const [select2, setSelect2] = useState("Cauliflower");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFileChange = (event, setFile) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="mt-20 bg-white text-black">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[800px]">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>

        {/* Always render all TabsContent */}
        <div>
          <div hidden={activeTab !== "tab1"}>
            {/* Tab 1 Content */}
            <Card>
              <CardHeader>
                <CardTitle>Tab 1</CardTitle>
                <CardDescription>This is tab 1</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Select Fruit</Label>
                    <Select value={select1} onValueChange={setSelect1}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Select Vegetable</Label>
                    <Select value={select2} onValueChange={setSelect2}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a vegetable" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Carrot">Carrot</SelectItem>
                          <SelectItem value="Broccoli">Broccoli</SelectItem>
                          <SelectItem value="Spinach">Spinach</SelectItem>
                          <SelectItem value="Bell Pepper">Bell Pepper</SelectItem>
                          <SelectItem value="Cauliflower">Cauliflower</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div hidden={activeTab !== "tab2"}>
            {/* Tab 2 Content */}
            <Card>
              <CardHeader>
                <CardTitle>Tab 2</CardTitle>
                <CardDescription>This is tab 2</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Upload File 1</Label>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(e, setFile1)}
                      placeholder="Choose file 1"
                    />
                    {file1 && <p>Selected file: {file1.name}</p>}
                  </div>
                  <div>
                    <Label>Upload File 2</Label>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(e, setFile2)}
                      placeholder="Choose file 2"
                    />
                    {file2 && <p>Selected file: {file2.name}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div hidden={activeTab !== "tab3"}>
            {/* Tab 3 Content */}
            <Card>
              <CardHeader>
                <CardTitle>Tab 3</CardTitle>
                <CardDescription>This is tab 3</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Content for Tab 3 */}
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
