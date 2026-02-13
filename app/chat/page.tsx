    'use client'

    import { useState, useRef, useEffect } from 'react'
    import { Navbar } from '@/components/navbar'
    import { Footer } from '@/components/footer'
    import { LoveProvider } from '@/app/context/love-context'
    import { Heart, Send, RotateCcw, Sparkles } from 'lucide-react'

    // ---- Simple Markdown Renderer ----
    function MarkdownText({ text }: { text: string }) {
        const renderMarkdown = (md: string): React.ReactNode[] => {
            const lines = md.split('\n')
            const elements: React.ReactNode[] = []
            let listItems: React.ReactNode[] = []
            let orderedItems: React.ReactNode[] = []
            let listKey = 0

            const flushUnorderedList = () => {
                if (listItems.length > 0) {
                    elements.push(
                        <ul key={`ul-${listKey++}`} className="list-disc list-inside space-y-1 my-2 ml-2">
                            {listItems}
                        </ul>
                    )
                    listItems = []
                }
            }

            const flushOrderedList = () => {
                if (orderedItems.length > 0) {
                    elements.push(
                        <ol key={`ol-${listKey++}`} className="list-decimal list-inside space-y-1 my-2 ml-2">
                            {orderedItems}
                        </ol>
                    )
                    orderedItems = []
                }
            }

            const inlineFormat = (text: string): React.ReactNode => {
                // Bold **text**
                const parts = text.split(/(\*\*[^*]+\*\*)/g)
                return parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
                    }
                    // Italic *text*
                    const italicParts = part.split(/(\*[^*]+\*)/g)
                    return italicParts.map((ip, j) => {
                        if (ip.startsWith('*') && ip.endsWith('*') && ip.length > 2) {
                            return <em key={`${i}-${j}`}>{ip.slice(1, -1)}</em>
                        }
                        return <span key={`${i}-${j}`}>{ip}</span>
                    })
                })
            }

            lines.forEach((line, idx) => {
                const trimmed = line.trim()

                // Headers
                if (trimmed.startsWith('### ')) {
                    flushUnorderedList()
                    flushOrderedList()
                    elements.push(
                        <h4 key={idx} className="font-semibold text-sm mt-3 mb-1 text-foreground">
                            {inlineFormat(trimmed.slice(4))}
                        </h4>
                    )
                    return
                }
                if (trimmed.startsWith('## ')) {
                    flushUnorderedList()
                    flushOrderedList()
                    elements.push(
                        <h3 key={idx} className="font-bold text-base mt-3 mb-1 text-foreground">
                            {inlineFormat(trimmed.slice(3))}
                        </h3>
                    )
                    return
                }

                // Unordered list items
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                    flushOrderedList()
                    listItems.push(
                        <li key={idx} className="text-sm leading-relaxed">
                            {inlineFormat(trimmed.slice(2))}
                        </li>
                    )
                    return
                }

                // Ordered list items
                const orderedMatch = trimmed.match(/^(\d+)\.\s(.+)/)
                if (orderedMatch) {
                    flushUnorderedList()
                    orderedItems.push(
                        <li key={idx} className="text-sm leading-relaxed">
                            {inlineFormat(orderedMatch[2])}
                        </li>
                    )
                    return
                }

                // Empty lines
                if (trimmed === '') {
                    flushUnorderedList()
                    flushOrderedList()
                    return
                }

                // Regular paragraph
                flushUnorderedList()
                flushOrderedList()
                elements.push(
                    <p key={idx} className="text-sm leading-relaxed my-1">
                        {inlineFormat(trimmed)}
                    </p>
                )
            })

            flushUnorderedList()
            flushOrderedList()

            return elements
        }

        return <div className="space-y-0.5">{renderMarkdown(text)}</div>
    }

    // ---- Main Chat Page ----
    type Message = {
        id: number
        text: string
        sender: 'user' | 'bot'
    }

    export default function ChatPage() {
        const [messages, setMessages] = useState<Message[]>([
            {
                id: 1,
                text: "Hi there! 👋 I'm **LoveBot**, your personal romance assistant!\n\nI can help you with:\n- 🎁 Gift ideas for your partner\n- 💑 Creative date plans\n- 💌 Romantic messages & love letters\n- 🌹 Surprise & celebration ideas\n\nAsk me anything about love! 💕",
                sender: 'bot',
            },
        ])
        const [inputValue, setInputValue] = useState('')
        const [isTyping, setIsTyping] = useState(false)
        const messagesEndRef = useRef<HTMLDivElement>(null)
        const inputRef = useRef<HTMLInputElement>(null)

        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }

        useEffect(() => {
            scrollToBottom()
        }, [messages, isTyping])

        const handleSend = async () => {
            if (!inputValue.trim() || isTyping) return

            const userMessage: Message = {
                id: Date.now(),
                text: inputValue,
                sender: 'user',
            }

            const updatedMessages = [...messages, userMessage]
            setMessages(updatedMessages)
            setInputValue('')
            setIsTyping(true)
            inputRef.current?.focus()

            try {
                // Send conversation history (skip the initial greeting for cleaner context)
                const historyForApi = updatedMessages.slice(1).map((m) => ({
                    sender: m.sender === 'bot' ? 'model' : 'user',
                    text: m.text,
                }))

                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: historyForApi }),
                })

                if (!res.ok) throw new Error('API error')

                const data = await res.json()
                const botMessage: Message = {
                    id: Date.now() + 1,
                    text: data.reply,
                    sender: 'bot',
                }

                setMessages((prev) => [...prev, botMessage])
            } catch {
                const errorMessage: Message = {
                    id: Date.now() + 1,
                    text: "Oops! I couldn't connect right now. Please try again in a moment! 💕",
                    sender: 'bot',
                }
                setMessages((prev) => [...prev, errorMessage])
            } finally {
                setIsTyping(false)
            }
        }

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
            }
        }

        const handleReset = () => {
            setMessages([
                {
                    id: Date.now(),
                    text: "Hi there! 👋 I'm **LoveBot**, your personal romance assistant!\n\nI can help you with:\n- 🎁 Gift ideas for your partner\n- 💑 Creative date plans\n- 💌 Romantic messages & love letters\n- 🌹 Surprise & celebration ideas\n\nAsk me anything about love! 💕",
                    sender: 'bot',
                },
            ])
            setIsTyping(false)
            setInputValue('')
        }

        return (
            <LoveProvider>
                <Navbar />
                <main className="min-h-screen pt-20 pb-8 bg-gradient-to-br from-[#C2185B] via-[#E91E63] to-[#F8BBD0]">
                    <div className="container mx-auto px-4 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 6rem)' }}>
                        <div className="w-full max-w-2xl h-[700px] bg-card rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-border/30">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary via-primary/90 to-secondary p-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-soft-white rounded-full flex items-center justify-center shadow-lg">
                                        <Heart className="w-6 h-6 text-primary fill-primary" />
                                    </div>
                                    <div>
                                        <h2 className="font-playfair text-lg font-bold text-primary-foreground">LoveBot</h2>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            <span className="font-inter text-xs text-primary-foreground/80">Your romance assistant</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleReset}
                                    className="p-2 rounded-full hover:bg-soft-white/20 transition-colors text-primary-foreground"
                                    title="Reset conversation"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-card to-card/95">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} fade-in`}
                                    >
                                        {message.sender === 'bot' && (
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                                <Sparkles className="w-4 h-4 text-primary" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${message.sender === 'user'
                                                    ? 'bg-primary text-primary-foreground rounded-br-md'
                                                    : 'bg-soft-white text-foreground rounded-bl-md border border-border/50'
                                                }`}
                                        >
                                            {message.sender === 'bot' ? (
                                                <MarkdownText text={message.text} />
                                            ) : (
                                                <p className="text-sm leading-relaxed">{message.text}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <div className="flex justify-start fade-in">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="bg-soft-white px-5 py-3 rounded-2xl rounded-bl-md shadow-sm border border-border/50">
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-card border-t border-border/30">
                                <div className="flex gap-3">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask about gifts, dates, surprises... 💕"
                                        disabled={isTyping}
                                        className="flex-1 px-5 py-3 bg-soft-white border border-border/50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 text-foreground placeholder-foreground/40 font-inter text-sm disabled:opacity-60"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim() || isTyping}
                                        className="px-5 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed font-inter font-medium text-sm flex items-center gap-2 btn-scale raised-shadow"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </LoveProvider>
        )
    }