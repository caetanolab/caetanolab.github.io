---
title: "GraspR"
date: 2025-09-30
author: ['Arthur Caetano', 'Yunhao Luo', 'Adwait Sharma', 'Misha Sra']
description: "Model of Spatial User Preferences for Adaptive Grasp Interfaces"
draft: false
type: "post"
tags: ["grasp", "adaptive", "user preference", 'toolkit', "xr", "uist"]
categories: ["Conference Paper"]
translationKey: 'media'
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/5khyDJbCbAE?si=Vok_UlfCfxOkv6oX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

XR promises to blend physical and virtual affordances, but current systems often require users to put objects aside, grab controllers, or make midair gestures with empty hands. This creates friction when using XR to support physical tasks. As an alternative, Grasp Interfaces let users interact through gestures and UI elements using the same hand that holds a physical object.

Traditionally, grasp interface design relies on elicitation studies informed by heuristics and datasets. This expert-driven approach allows strong alignment with user preferences, but it takes many hours of participants’ and designers’ time. As a result, it is hard to scale this method to a large number of grasp and object combinations. Recent computational methods can simulate human grasp, helping to accommodate new object geometries and grasp types. But they still lack user preference information and can lead to designs that are feasible from a technical perspective but inconvenient to end-users. In summary, current design approaches lack either speed or user preference information And both essential for deployment of across use cases.

To overcome this limitation, we present GraspR, a pairwise classifier that that predicts user preference between two alternative single-finger gestures. We can combine GraspR predictions to obtain a point cloud where each point encodes a preference score. For example, graspr understands that, when holding a can, users prefer to lightly extend their index finger instead of flexing the ring finger against the surface of the object. This information is useful to place interactive elements around the grasp in a layout that is both accessible and aligned with user preferences. Combining GraspR with object detection, we can turn objects into shortcuts to quickly switch apps and reduce downtime between physical tasks.

[Publisher](https://doi.org/10.1145/3746059.3747744)

[Code](https://github.com/HAL-UCSB/graspr)

#### BibTex
```latex
@inproceedings{10.1145/3746059.3747744,
    author = {Caetano, Arthur and Luo, Yunhao and Sharma, Adwait and Sra, Misha},
    title = {GraspR: A Computational Model of Spatial User Preferences for Adaptive Grasp UI Design},
    year = {2025},
    isbn = {9798400720376},
    publisher = {Association for Computing Machinery},
    address = {New York, NY, USA},
    url = {https://doi.org/10.1145/3746059.3747744},
    doi = {10.1145/3746059.3747744},
    abstract = {Grasp User Interfaces (grasp UIs) enable dual-tasking in XR by allowing interaction with digital content while holding physical objects. However, current grasp UI design practices face a fundamental challenge: existing approaches either capture user preferences through labor-intensive elicitation studies that are difficult to scale, or rely on biomechanical models that overlook subjective factors. We introduce GraspR, the first computational model that predicts user preferences for single-finger microgestures in grasp UIs. Our data-driven approach combines the scalability of computational methods with human preference modeling, trained on 1,520 preferences collected via a two-alternative forced choice paradigm across eight participants and four frequently used grasp variations. We demonstrate GraspR’s effectiveness through a working prototype that dynamically adjusts interface layouts across four everyday tasks. We release both the dataset and code to support future research in adaptive grasp UIs.},
    booktitle = {Proceedings of the 38th Annual ACM Symposium on User Interface Software and Technology},
    articleno = {96},
    numpages = {16},
    keywords = {grasp-based interfaces, user preference, adaptive interfaces, extended reality},
    location = {
    },
    series = {UIST '25}
}
```

<iframe  src='https://arxiv.org/pdf/2501.05434v2' width='100%' height='1200px'></iframe>