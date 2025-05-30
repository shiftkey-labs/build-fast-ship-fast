"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon, Sparkles, Zap, Star, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion"

// Custom Futuristic Accordion Components
function FuturisticAccordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function FuturisticAccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-purple-500/30 shadow-2xl transition-all duration-500 hover:shadow-purple-500/25 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-400/50",
        className
      )}
      {...props}
    />
  )
}

function FuturisticAccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group relative flex flex-1 items-center justify-between gap-4 p-6 text-left font-bold text-lg bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 outline-none hover:from-purple-300 hover:via-pink-300 hover:to-cyan-300 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-cyan-400",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {children}
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-40" />
          <ChevronDownIcon className="relative h-6 w-6 text-purple-400 transition-all duration-300 group-hover:text-cyan-400" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function FuturisticAccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...props}
    >
      <div className={cn(
        "relative px-6 pb-6 pt-2 text-gray-300 leading-relaxed",
        "before:absolute before:left-6 before:top-0 before:h-px before:w-12 before:bg-gradient-to-r before:from-purple-500 before:to-cyan-500",
        className
      )}>
        <div className="relative">
          <div className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 opacity-60 blur-sm" />
          {children}
        </div>
      </div>
    </AccordionPrimitive.Content>
  )
}

// Retro Gaming Accordion Components
function RetroAccordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function RetroAccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "mb-4 border-4 border-green-400 bg-black shadow-[8px_8px_0px_0px_#22c55e] transition-all duration-200 hover:shadow-[12px_12px_0px_0px_#22c55e] hover:translate-x-[-4px] hover:translate-y-[-4px]",
        className
      )}
      {...props}
    />
  )
}

function RetroAccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 p-4 text-left font-mono text-lg font-bold text-green-400 transition-all duration-200 outline-none hover:bg-green-400/10 focus-visible:bg-green-400/20 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border-2 border-green-400 bg-green-400 text-black">
            <Zap className="h-4 w-4" />
          </div>
          <span className="uppercase tracking-wider">{children}</span>
        </div>
        <ChevronDownIcon className="h-6 w-6 text-green-400 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function RetroAccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...props}
    >
      <div className={cn(
        "border-t-2 border-green-400 bg-green-400/5 p-4 font-mono text-sm text-green-300",
        className
      )}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export default function AccordionDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="mx-auto max-w-6xl">

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Original shadcn/ui Accordion */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-white">Original shadcn/ui</h2>
              <p className="text-sm text-gray-400">Clean, minimal, professional</p>
            </div>
            
            <div className="rounded-lg border border-gray-700 bg-black p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-gray-600">
                  <AccordionTrigger className="text-white hover:text-gray-200">What is shadcn/ui?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    shadcn/ui is a collection of reusable components built using Radix UI and Tailwind CSS. 
                    It provides a solid foundation for building modern web applications with consistent design patterns.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-gray-600">
                  <AccordionTrigger className="text-white hover:text-gray-200">Why use Tailwind CSS?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Tailwind CSS is a utility-first CSS framework that enables rapid UI development. 
                    It provides low-level utility classes that let you build completely custom designs without leaving your HTML.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-gray-600">
                  <AccordionTrigger className="text-white hover:text-gray-200">How flexible is it?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Extremely flexible! As you can see from these examples, the same underlying component 
                    can be styled in completely different ways while maintaining accessibility and functionality.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Futuristic Accordion */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-white">Futuristic Cyber</h2>
              <p className="text-sm text-gray-400">Neon, gradients, sci-fi vibes</p>
            </div>
            
            <div className="rounded-lg border border-purple-500/30 bg-gray-900/50 p-6 backdrop-blur-sm">
              <FuturisticAccordion type="single" collapsible className="w-full space-y-6">
                <FuturisticAccordionItem value="item-1">
                  <FuturisticAccordionTrigger>Neural Interface Design</FuturisticAccordionTrigger>
                  <FuturisticAccordionContent>
                    Experience the future of web design with holographic interfaces and quantum-powered animations. 
                    Our neural networks adapt to user behavior, creating personalized digital experiences that 
                    transcend traditional boundaries.
                  </FuturisticAccordionContent>
                </FuturisticAccordionItem>
                <FuturisticAccordionItem value="item-2">
                  <FuturisticAccordionTrigger>Quantum Styling Engine</FuturisticAccordionTrigger>
                  <FuturisticAccordionContent>
                    Harness the power of quantum computing for instantaneous style calculations. 
                    Our advanced algorithms process infinite design possibilities in parallel dimensions, 
                    delivering optimal visual experiences across all realities.
                  </FuturisticAccordionContent>
                </FuturisticAccordionItem>
                <FuturisticAccordionItem value="item-3">
                  <FuturisticAccordionTrigger>Cybernetic Flexibility</FuturisticAccordionTrigger>
                  <FuturisticAccordionContent>
                    Merge human creativity with artificial intelligence to create interfaces that evolve. 
                    Our cybernetic design system learns from user interactions and automatically optimizes 
                    for maximum engagement and aesthetic appeal.
                  </FuturisticAccordionContent>
                </FuturisticAccordionItem>
              </FuturisticAccordion>
            </div>
          </div>

          {/* Retro Gaming Accordion */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-white">Retro Gaming</h2>
              <p className="text-sm text-gray-400">8-bit nostalgia, terminal vibes</p>
            </div>
            
            <div className="rounded-lg border-4 border-green-400 bg-black p-6">
              <RetroAccordion type="single" collapsible className="w-full">
                <RetroAccordionItem value="item-1">
                  <RetroAccordionTrigger>SYSTEM.INIT</RetroAccordionTrigger>
                  <RetroAccordionContent>
                    {"> LOADING RETRO PROTOCOL..."}<br/>
                    {"> INITIALIZING 8-BIT GRAPHICS ENGINE..."}<br/>
                    {"> CONNECTING TO MAINFRAME..."}<br/>
                    {"> STATUS: ONLINE"}<br/>
                    {"> READY FOR INPUT_"}
                  </RetroAccordionContent>
                </RetroAccordionItem>
                <RetroAccordionItem value="item-2">
                  <RetroAccordionTrigger>GRAPHICS.MODE</RetroAccordionTrigger>
                  <RetroAccordionContent>
                    {"> PIXEL ART RENDERING: ENABLED"}<br/>
                    {"> SCANLINE EFFECTS: ACTIVE"}<br/>
                    {"> CHIPTUNE AUDIO: PLAYING"}<br/>
                    {"> NOSTALGIA LEVEL: MAXIMUM"}<br/>
                    {"> PRESS START TO CONTINUE_"}
                  </RetroAccordionContent>
                </RetroAccordionItem>
                <RetroAccordionItem value="item-3">
                  <RetroAccordionTrigger>POWER.LEVEL</RetroAccordionTrigger>
                  <RetroAccordionContent>
                    {"> ANALYZING COMPONENT FLEXIBILITY..."}<br/>
                    {"> POWER LEVEL: OVER 9000!"}<br/>
                    {"> SAME RADIX PRIMITIVES"}<br/>
                    {"> INFINITE STYLE POSSIBILITIES"}<br/>
                    {"> GAME OVER? NEVER!_"}
                  </RetroAccordionContent>
                </RetroAccordionItem>
              </RetroAccordion>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
