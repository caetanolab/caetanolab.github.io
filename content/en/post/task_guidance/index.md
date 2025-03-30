---
title: 'XR Task Guidance'
date: 2023-01-25
author: ['Arthur Caetano', 'Avinash Ajit Nargund', 'Alejandro Aponte', 'Aman Sariya', 'Misha Sra']
cover: 'cover.png'
description: 'Prototypes of XR UIs for Physical Task Guidance'
draft: false
type: 'post'
tags: ['XR', 'Task Guidance']
categories: ['Prototypes']
translationKey: 'media'
---

XR and AI technologies have the potential to assist users during physical task performance. Examples include machinery repair, cooking, and playing a musical instrument. These are some prototypes of XR interfaces I developed to support these use cases.

## Brewing Coffee with XR Widgets
Brewing a cup of coffee is a simple task, but it has features found in more complex procedures: step-by-step execution, precise timing, accurate measurements, and careful management of potential hazards.
This prototype was built using Unity MRTK and HoloLens 2 as part of the [DARPA PTG grant](https://www.darpa.mil/news/2023/video-ai-assistants). Our system includes a hand menu that users can activate by looking at the palm of their non-dominant hand.
Through the menu, users can toggle various widgets using a tap gesture or voice commands. User can rearrange widgets to customize their XR workspace. This prototype included the following widgets:
- Cookbook with text and image instructions
- Automatic checklist using object detection
- 4D Demonstration of how to fold a coffee filter
- Safety AR overlays to highlight sharp and hot objects
- Timer to keep track of cooking times while users take care of another step
- Video instructions pulled from online repositories.



<iframe src="https://drive.google.com/file/d/17w0ext7tFBnbyjo4SBQ7hj5IJOylIois/preview" width="640" height="480" allow="autoplay"></iframe>

## XR Hand Guidance
Physical tasks are inherently hands-on. This prototype demonstrates hand trajectory and pose guidance, which serves as a key building block for other physical task scenarios.
<iframe src="https://drive.google.com/file/d/1IoTYq7ZQSDdQ5GWgC7ciZOo0zrhh8hxm/preview?t=10s" width="640" height="480" allow="autoplay"></iframe>