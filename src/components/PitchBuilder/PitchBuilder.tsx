"use client";

import './page.module.css';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useState,useEffect } from "react";
import ComponentList from "@/app/detailCampaign/[id]/pitch_builderV2/components/ComponentList";
import SlidePreview from "@/app/detailCampaign/[id]/pitch_builderV2/components/SlidePreview";
import EditDialog from "@/app/detailCampaign/[id]/pitch_builderV2/components/EditDialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ComponentItem, SlideComponent } from "@/app/detailCampaign/[id]/pitch_builderV2/types";
import { nanoid } from "nanoid";
import axios from 'axios';

const PitchBuilder = () => {
  const [components, setComponents] = useState<SlideComponent[]>([]);
  const [editingComponent, setEditingComponent] = useState<ComponentItem | null>(
    null
  );
  const [pitchGenerating, setPitchGenerating] = useState<boolean>(false);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // Handle dropping into trash
    if (destination.droppableId === "trash") {
      if (source.droppableId === "slide") {
        const newComponents = components.filter((_, index) => index !== source.index);
        setComponents(newComponents);
        
      }
      return;
    }

    // Reordering within the slide
    if (source.droppableId === "slide" && destination.droppableId === "slide") {
      console.log("components", components);
      const newComponents = Array.from(components);
      const [removed] = newComponents.splice(source.index, 1);
      newComponents.splice(destination.index, 0, removed);
      setComponents(newComponents);
      return;
    }

    // Adding new component from component list to slide
    if (source.droppableId === "component-list" && destination.droppableId === "slide") {
      const sourceComponent = components.find(c => c.id === draggableId);
      const newComponent: ComponentItem = {
        id: `${draggableId}-${nanoid()}`,
        type: sourceComponent ? sourceComponent.type : draggableId as ComponentItem["type"],
        content: "",
      };
      setEditingComponent(newComponent);
    }
  };

  const handleSaveComponent = (content: string) => {
    if (!editingComponent) return;

    const newComponent: SlideComponent = {
      ...editingComponent,
      content,
      position: components.length,
    };

    setComponents([...components, newComponent]);
    setEditingComponent(null);
  };

  useEffect(() => {
    console.log('components', components);
          

          async function getData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pitch?id=67a19f0709d06dc1d357e833`);
                console.log(response.data);
                let requiredComponents = response.data[0].slides;
                setComponents(requiredComponents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        
        getData();
  }, []);

  const exportToHtml = () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Pitch Deck</title>
        </head>
        <body>
          <div class="max-w-4xl mx-auto p-8">
            ${components
              .map((component) => {
                switch (component.type) {
                  case "heading":
                    return `<h2 class="text-3xl font-bold mb-4">${component.content}</h2>`;
                  case "paragraph":
                    return `<p class="mb-4">${component.content}</p>`;
                  case "image":
                    return `<img src="${component.content}" alt="Slide content" class="max-w-full h-auto mb-4 rounded-lg">`;
                  case "youtube":
                    return `
                      <div class="aspect-w-16 aspect-h-9 mb-4">
                        <iframe
                          src="${component.content}"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                          class="rounded-lg"
                        ></iframe>
                      </div>
                    `;
                  case "unordered-list":
                    return `
                      <ul class="list-disc list-inside mb-4">
                        ${component.content
                          ?.split("\n")
                          .map((item: string) => `<li>${item}</li>`)
                          .join("")}
                      </ul>
                    `;
                  case "ordered-list":
                    return `
                      <ol class="list-decimal list-inside mb-4">
                        ${component.content
                          ?.split("\n")
                          .map((item: string) => `<li>${item}</li>`)
                          .join("")}
                      </ol>
                    `;
                  default:
                    return "";
                }
              })
              .join("\n")}
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pitch-deck.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const pitchGenerate = async () => {
      try {
        setPitchGenerating(true);
       /*  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_AI_URL}/pitchbuilder`, {
             "influencer" : "E-Commerce app"
        }); 
        console.log(response.data);*/
        setPitchGenerating(false);
        let pitchcotent = {
          "pitch_deck_content": {
              "Business Model": {
                  "content": "Introducing CRM System, the next-generation customer relationship management platform designed for small businesses. Our intuitive interface and AI-driven insights help automate customer interactions, enhance retention, and boost sales performance. With real-time analytics, personalization tools, and seamless integration capabilities, CRM System empowers your team to connect more effectively and efficiently. Experience unparalleled productivity, build lasting customer loyalty, and accelerate growth with CRM System—your partner in turning customer insights into actionable strategies. Transform client engagement effortlessly and watch your business thrive.",
                  "position": 16,
                  "type": "paragraph"
              },
              "Business Model_header": {
                  "content": "Business Model",
                  "position": 15,
                  "type": "heading"
              },
              "Business Model_image": {
                  "content": "http://192.168.3.7:5000/images/Business Model.jpg",
                  "position": 17,
                  "type": "image"
              },
              "Conclusion": {
                  "content": "In conclusion, CRM System is your partner in cultivating meaningful customer relationships. With our intuitive platform, streamlined processes, and actionable insights, we empower your business to thrive by understanding and anticipating customer needs better than ever before. Choose CRM System to transform interactions into lasting connections and drive your business to new heights. Let's grow together—seamlessly, efficiently, and successfully. Join us in redefining customer relationship management today!",
                  "position": 25,
                  "type": "paragraph"
              },
              "Conclusion_header": {
                  "content": "Conclusion",
                  "position": 24,
                  "type": "heading"
              },
               "Conclusion_image": {
                  "content": "http://192.168.3.7:5000/images/Conclusion.jpg",
                  "position": 26,
                  "type": "image"
              },
              "Financial Projections": {
                  "content": "For 'CRM System,' envision a groundbreaking platform transforming customer relationship management. Here's our pitch:\n\nIntroducing CRM System – your ultimate tool for seamless client interactions and unrivaled productivity. Our intuitive interface and customizable features empower businesses to track leads, manage customer information, and automate tasks effortlessly. With state-of-the-art analytics, gain deep insights to drive strategic decisions and boost sales. Enjoy enhanced customer satisfaction and efficiency while saving time and resources. Join us in redefining CRM solutions, where success meets simplicity. Invest in CRM System – where your business potential is unleashed.",
                  "position": 22,
                  "type": "paragraph"
              },
              "Financial Projections_header": {
                  "content": "Financial Projections",
                  "position": 21,
                  "type": "heading"
              },
               "Financial Projections_image": {
                  "content": "http://192.168.3.7:5000/images/Financial Projections.jpg",
                  "position": 23,
                  "type": "image"
              },
              "Introduction": {
                  "content": "Introducing CRM System, the revolutionary platform transforming how businesses engage with their customers. Our intuitive interface consolidates customer interactions, streamlines sales processes, and provides actionable insights—all in one place. With CRM System, businesses can enhance relationships, boost productivity, and drive growth like never before. Experience seamless integration, customizable features, and robust data security. Elevate your customer management strategy and stay ahead in a competitive market. Discover the power of CRM System and unlock your business's full potential today.",
                  "position": 1,
                  "type": "paragraph"
              },
              "Introduction_header": {
                  "content": "Introduction",
                  "position": 0,
                  "type": "heading"
              },
               "Introduction_image": {
                  "content": "http://192.168.3.7:5000/images/Introduction.jpg",
                  "position": 2,
                  "type": "image"
              },
              "Market Size": {
                  "content": "Introducing CRM System, the next-generation customer relationship platform designed to revolutionize your business interactions. With an estimated CRM software market growth of 14.27% annually, demand is skyrocketing as companies recognize the value of personalized customer experiences. CRM System's unique AI-driven insights and seamless integrations empower businesses to boost efficiency by 30%, converting leads into loyal customers. Our user-friendly interface, tailored analytics, and scalable solutions ensure you stay ahead in an evolving market. Invest in CRM System and transform how you connect with your customers today!",
                  "position": 13,
                  "type": "paragraph"
              },
              "Market Size_header": {
                  "content": "Market Size",
                  "position": 12,
                  "type": "heading"
              },
               "Market Size_image": {
                  "content": "http://192.168.3.7:5000/images/Market Size.jpg",
                  "position": 14,
                  "type": "image"
              },
              "Marketing Strategy": {
                  "content": "Introducing CRM System—the groundbreaking, all-in-one customer relationship management platform engineered to transform how businesses connect, engage, and thrive. Seamlessly integrate with existing tools, harness AI-driven insights for personalized customer interactions, and elevate efficiency with intuitive automation workflows. Our cloud-based solution ensures data security and accessibility from anywhere in the world. Whether you're a small business or an enterprise, CRM System empowers your team to cultivate lasting relationships that drive growth and success. Join us on the journey toward smarter business strategies and unparalleled customer satisfaction.",
                  "position": 19,
                  "type": "paragraph"
              },
              "Marketing Strategy_header": {
                  "content": "Marketing Strategy",
                  "position": 18,
                  "type": "heading"
              },
               "Marketing Strategy_image": {
                  "content": "http://192.168.3.7:5000/images/Marketing Strategy.jpg",
                  "position": 20,
                  "type": "image"
              },
              "Problem Statement": {
                  "content": "In today's fast-paced business environment, companies struggle to maintain meaningful relationships with their customers due to fragmented communications and data silos. This disconnect results in missed opportunities, inefficient processes, and unsatisfied clients. Without a comprehensive, integrated solution, businesses face challenges in managing customer interactions, tracking sales activities, and personalizing service. With this persistent problem, organizations are in urgent need of a cohesive CRM approach to enhance productivity, boost sales, and build lasting customer loyalty.",
                  "position": 7,
                  "type": "paragraph"
              },
              "Problem Statement_header": {
                  "content": "Problem Statement",
                  "position": 6,
                  "type": "heading"
              },
               "Problem Statement_image": {
                  "content": "http://192.168.3.7:5000/images/Problem Statement.jpg",
                  "position": 8,
                  "type": "image"
              },
              "Solution": {
                  "content": "Introducing CRM System: a cutting-edge customer relationship management solution that transforms how businesses interact with clients. Designed for efficiency, it offers intuitive tools to streamline communication, automate tasks, and personalize customer experiences. Our platform integrates seamlessly with existing workflows, providing real-time analytics to drive informed decisions and foster growth. With CRM System, you gain deeper insights, enhance customer satisfaction, and boost productivity. Tailor-made for businesses aiming to excel, it’s your ultimate partner in understanding and nurturing client relationships. Experience the future of CRM today—elevate your customer engagements like never before.",
                  "position": 10,
                  "type": "paragraph"
              },
              "Solution_header": {
                  "content": "Solution",
                  "position": 9,
                  "type": "heading"
              },
               "Solution_image": {
                  "content": "http://192.168.3.7:5000/images/Solution.jpg",
                  "position": 11,
                  "type": "image"
              },
              "Team Overview": {
                  "content": "Introducing the powerhouse team behind CRM System, a revolutionary platform transforming customer relationship management. Our CEO, Alex Martinez, is a serial entrepreneur with deep expertise in SaaS and a history of successful exits. CTO Priya Desai, a former lead developer at a major tech firm, brings cutting-edge technology and innovation to our platform. CMO Jenna Lee, with a decade's experience in digital marketing, crafts our compelling brand story. Together, they combine visionary leadership, technical prowess, and strategic marketing to propel CRM System to the industry forefront.",
                  "position": 4,
                  "type": "paragraph"
              },
              "Team Overview_header": {
                  "content": "Team Overview",
                  "position": 3,
                  "type": "heading"
              },
               "Team Overview_image": {
                  "content": "http://192.168.3.7:5000/images/Team Overview.jpg",
                  "position": 5,
                  "type": "image"
              }
          }
      }
        console.log("pitchcontent=> ",pitchcotent);
        //let requiredComponentsObj = response.data.pitch_deck_content;
        let requiredComponents = Object.values(pitchcotent.pitch_deck_content);
        console.log("requiredComponents=> ",requiredComponents);
        requiredComponents = requiredComponents.sort((a: any, b: any) => a.position - b.position);
        setComponents(requiredComponents as SlideComponent[]);
        
    } catch (error) {

        console.error('Error posting data:', error);
        setPitchGenerating(false);
    }
  }

  return (
    <div id="pitchDeck" className='mt-20'>

    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Pitch Deck Builder</h1>
           {/*  <Button onClick={exportToHtml}>
              <Download className="w-4 h-4 mr-2" />
              Export as HTML
            </Button> */}
            <Button onClick={pitchGenerate}>
              <Download className="w-4 h-4 mr-2" />
              { pitchGenerating ? "Generating Pitch Deck" : "Generate Pitch Deck"}
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-1">
              <ComponentList />
            </div>
            <div className="col-span-3">
              <SlidePreview components={components} />
            </div>
          </div>
        </div>
        <EditDialog
          component={editingComponent}
          isOpen={!!editingComponent}
          onClose={() => setEditingComponent(null)}
          onSave={handleSaveComponent}
        />
      </div>
    </DragDropContext>

    </div>
  );
};

export default PitchBuilder;
