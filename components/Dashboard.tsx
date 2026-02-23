import React, { useState, useEffect, useRef } from 'react';
import { APP_NAME, LOGO_URL } from '../constants';
import { NavigationProps, SocialProfile, ScheduledPost } from '../types';
import { GoogleGenAI } from "@google/genai";
import {
    LayoutDashboard,
    PenSquare,
    Calendar,
    BarChart2,
    Settings,
    LogOut,
    Bell,
    Users,
    Share2,
    Plus,
    Link as LinkIcon,
    Trash2,
    X as XIcon,
    ImageIcon,
    Video as VideoIcon,
    Play,
    Pause,
    Send as SendIcon,
    Clock,
    Smartphone,
    Layers,
    Globe,
    TrendingUp,
    TrendingDown,
    Zap,
    ZapOff,
    Check,
    MoreHorizontal,
    Pencil,
    Sliders,
    Facebook,
    Linkedin,
    ArrowLeft,
    User,
    UserPlus,
    CalendarDays,
    Monitor,
    Search,
    Sparkles,
    Activity,
    AlertCircle,
    ChevronRight,
    RotateCcw,
    ChevronLeft,
    Volume2,
    VolumeX,
    ArrowRight,
    Heart,
    MessageCircle,
    Music2,
    ThumbsUp,
    ThumbsDown,
    MoreVertical,
    Camera,
    PlusCircle,
    Bookmark,
    Menu as MenuIcon
} from 'lucide-react';

const labels: Record<string, string> = {
    overview: 'Visão Geral',
    create: 'Criar Post',
    schedule: 'Agendamento',
    analytics: 'Relatórios',
    integrations: 'Perfis Conectados',
    settings: 'Configurações'
};

const InstagramIcon = ({ size }: { size: number }) => (<img src="https://i.imgur.com/hBfVROx.png" alt="Instagram" className="object-contain" style={{ width: size, height: size }} />);
const TikTokIcon = ({ size }: { size: number }) => (<img src="https://i.imgur.com/z3lSrw1.png" alt="TikTok" className="object-contain" style={{ width: size, height: size }} />);
const YouTubeIcon = ({ size }: { size: number }) => (<img src="https://i.imgur.com/ZdRCong.png" alt="YouTube" className="object-contain" style={{ width: size, height: size }} />);
const XIconLogo = ({ size }: { size: number }) => (<img src="https://i.imgur.com/vhUapJK.png" alt="X" className="object-contain" style={{ width: size, height: size }} />);

const Dashboard: React.FC<NavigationProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [greeting, setGreeting] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // --- USER STATE ---
    const [userName, setUserName] = useState('Ramon Dias');
    const [userEmail, setUserEmail] = useState('ramondias467@gmail.com');
    const [userAvatar, setUserAvatar] = useState<string | null>(null);

    // --- DASHBOARD DATA STATE ---
    const [profiles, setProfiles] = useState<SocialProfile[]>([]);
    const [publishedPosts, setPublishedPosts] = useState<any[]>([]);
    const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
    const [showAllPosts, setShowAllPosts] = useState(false);
    
    // Modais Perfis
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [addProfileStep, setAddProfileStep] = useState<'none' | 'select' | 'details'>('none');
    const [selectedNetwork, setSelectedNetwork] = useState<SocialProfile['network'] | null>(null);
    const [newProfileName, setNewProfileName] = useState('');
    const [newProfileUser, setNewProfileUser] = useState('');

    // Criar Post
    const [postType, setPostType] = useState<'post' | 'carousel' | 'reels' | 'tiktok' | 'shorts'>('post');
    const [legend, setLegend] = useState('');
    const [includeHashtags, setIncludeHashtags] = useState(false);
    const [hashtags, setHashtags] = useState('');
    const [mediaFiles, setMediaFiles] = useState<{ url: string, type: string }[]>([]);
    
    // IA Legend Generator
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [aiTone, setAiTone] = useState('Criativo');
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGeneratingIA, setIsGeneratingIA] = useState(false);

    // Preview Controls
    const [previewIndex, setPreviewIndex] = useState(0);
    const [isPreviewMuted, setIsPreviewMuted] = useState(false);
    const [isPreviewPaused, setIsPreviewPaused] = useState(false);

    // Drag and Drop State
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

    // Agendamento Flow
    const [schedulingStep, setSchedulingStep] = useState<'date-time' | 'platforms' | 'success' | null>(null);
    const [isPostNowFlow, setIsPostNowFlow] = useState(false);
    const [tempDate, setTempDate] = useState(new Date().toISOString().split('T')[0]);
    const [tempTime, setTempTime] = useState('12:30');
    const [selectedPlatformIds, setSelectedPlatformIds] = useState<string[]>([]);

    // Analytics
    const [analyticsTimeRange, setAnalyticsTimeRange] = useState('30 DIAS');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const timeInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const hour = new Date().getHours();
        const userShortName = userName.split(' ')[0];
        if (hour >= 6 && hour < 12) setGreeting(`Bom dia, ${userShortName}! 👋`);
        else if (hour >= 12 && hour < 18) setGreeting(`Boa tarde, ${userShortName}! 👋`);
        else setGreeting(`Boa noite, ${userShortName}! 👋`);
    }, [userName]);

    useEffect(() => {
        if (videoRef.current) {
            if (isPreviewPaused) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(() => {});
            }
        }
    }, [isPreviewPaused, mediaFiles, previewIndex, postType]);

    // --- HANDLERS ---
    const handleDragStart = (index: number) => {
        if (postType !== 'carousel') return;
        setDraggedItemIndex(index);
    };

    const handleDragOver = (e: React.DragEvent) => {
        if (postType !== 'carousel') return;
        e.preventDefault();
    };

    const handleDrop = (index: number) => {
        if (postType !== 'carousel' || draggedItemIndex === null) return;
        const newMediaFiles = [...mediaFiles];
        const draggedItem = newMediaFiles[draggedItemIndex];
        newMediaFiles.splice(draggedItemIndex, 1);
        newMediaFiles.splice(index, 0, draggedItem);
        setMediaFiles(newMediaFiles);
        setDraggedItemIndex(null);
        setPreviewIndex(0);
    };

    const handleAddProfileClick = () => {
        if (profiles.length >= 3) setIsLimitModalOpen(true);
        else setAddProfileStep('select');
    };

    const confirmAddProfile = () => {
        if (!selectedNetwork || !newProfileName) return;
        const newP: SocialProfile = {
            id: Math.random().toString(36).substr(2, 9),
            network: selectedNetwork,
            displayName: newProfileName,
            username: newProfileUser || `user`,
            status: 'active'
        };
        setProfiles([...profiles, newP]);
        setAddProfileStep('none');
        setNewProfileName('');
        setNewProfileUser('');
        setSelectedNetwork(null);
    };

    const handleAIGenerate = async () => {
        if (!aiPrompt) return;
        setIsGeneratingIA(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Aja como um especialista em marketing digital. Gere uma legenda para redes sociais. 
                TEMA: "${aiPrompt}". 
                TOM DE VOZ: ${aiTone}. 
                INSTRUÇÕES: Seja persuasivo, use emojis e no final sugira 3 hashtags relevantes. Não use introduções, retorne apenas o texto do post pronto para publicar.`,
            });
            const text = response.text || "Erro ao gerar legenda.";
            setLegend(text);
            setIsAIModalOpen(false);
            setAiPrompt('');
        } catch (error) {
            console.error("Erro IA:", error);
            alert("Erro ao conectar com a IA. Verifique se o seu limite de requisições ou chave API está correto.");
        } finally {
            setIsGeneratingIA(false);
        }
    };

    const publishNow = () => {
        const selectedNets = profiles
            .filter(p => selectedPlatformIds.includes(p.id))
            .map(p => p.network);

        const newPostEntry = {
            id: Math.random().toString(36).substr(2, 9),
            title: legend || "Novo Post UniPost",
            platforms: selectedNets,
            time: "agora mesmo",
            img: mediaFiles[0]?.url || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
            mediaType: mediaFiles[0]?.type || 'image',
            engagement: 0,
            impressions: 0
        };
        
        if (isPostNowFlow) {
            setPublishedPosts([newPostEntry, ...publishedPosts]);
            setSchedulingStep('success');
        } else {
            const newSched: ScheduledPost = {
                id: Math.random().toString(36).substr(2, 9),
                title: legend || "Sem legenda",
                date: tempDate,
                time: tempTime,
                status: 'scheduled',
                networks: selectedNets,
                imageUrl: mediaFiles[0]?.url,
                mediaType: mediaFiles[0]?.type
            };
            setScheduledPosts([newSched, ...scheduledPosts]);
            setSchedulingStep('success');
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveSettings = () => {
        alert('Alterações salvas com sucesso!');
    };

    // --- CALCULATED METRICS ---
    const totalPublished = publishedPosts.length;
    const totalFollowers = totalPublished > 0 ? (totalPublished * 125) : 0;
    const avgEngagement = totalPublished > 0 
        ? (publishedPosts.reduce((acc, p) => acc + p.engagement, 0) / totalPublished).toFixed(1) 
        : "0,0";

    const scheduledForToday = scheduledPosts.filter(p => p.date === new Date().toISOString().split('T')[0]);

    // --- RENDER HELPERS ---

    const renderOverviewTab = () => (
        <div className="space-y-8 animate-in fade-in duration-300 text-left">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">{greeting}</h2>
                    <p className="text-sm text-gray-400 font-medium">Aqui está o que está acontecendo hoje com suas contas.</p>
                </div>
                <button onClick={() => setActiveTab('create')} className="w-full md:w-auto bg-brand text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-brand/20 shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                    <Plus size={20} strokeWidth={3} /> Novo Post
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                    { label: 'TOTAL DE POSTS', value: totalPublished.toString(), trend: totalPublished > 0 ? '+100%' : '0%', isUp: true, icon: Share2, color: 'text-blue-500', bg: 'bg-blue-50/50' },
                    { label: 'SEGUIDORES TOTAIS', value: totalFollowers > 1000 ? `${(totalFollowers/1000).toFixed(1)}k` : totalFollowers.toString(), trend: totalPublished > 0 ? '+5.2%' : '0%', isUp: true, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50/50' },
                    { label: 'TAXA DE ENGAJAMENTO', value: `${avgEngagement}%`, trend: totalPublished > 0 ? '+1.4%' : '0%', isUp: true, icon: BarChart2, color: 'text-amber-500', bg: 'bg-amber-50/50' }
                ].map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6 relative group hover:shadow-md transition-all">
                         <div className={`absolute top-8 right-8 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black ${s.isUp ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'}`}>
                            {s.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{s.trend}
                        </div>
                        <div className={`w-14 h-14 ${s.bg} ${s.color} rounded-[20px] flex items-center justify-center transition-transform group-hover:scale-105`}><s.icon size={24} /></div>
                        <div>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{s.label}</p>
                            <p className="text-3xl font-black text-gray-900 leading-none">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-10 py-7 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="font-black text-gray-900 text-sm tracking-tight">Posts Recentes</h3>
                        <button onClick={() => setShowAllPosts(!showAllPosts)} className="text-brand text-xs font-bold hover:underline">
                            {showAllPosts ? 'Ver Menos' : 'Ver Todos'}
                        </button>
                    </div>
                    <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto custom-scrollbar">
                        {publishedPosts.length > 0 ? (
                            (showAllPosts ? publishedPosts : publishedPosts.slice(0, 2)).map((post, idx) => (
                                <div key={idx} className="px-10 py-6 flex items-center gap-6 hover:bg-slate-50/50 transition-colors">
                                    <div className="w-16 h-16 rounded-[20px] overflow-hidden border border-slate-100 shrink-0">
                                        {post.mediaType === 'video' ? (
                                            <video src={post.img} className="w-full h-full object-cover" muted />
                                        ) : (
                                            <img src={post.img} className="w-full h-full object-cover" alt="" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-gray-900 truncate mb-1">{post.title}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{post.platforms.join(', ')} • {post.time}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="px-4 py-1.5 bg-[#eefcf4] text-[#22c55e] text-[9px] font-black uppercase rounded-full tracking-widest border border-emerald-100/30">Publicado</span>
                                        <button className="text-slate-300 hover:text-gray-900 transition-colors"><MoreHorizontal size={20} /></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-16 text-center text-slate-300 font-bold text-sm">Nenhum post publicado ainda.</div>
                        )}
                    </div>
                </div>
                <div className="lg:col-span-4 bg-white rounded-[40px] border border-gray-100 shadow-sm p-10">
                    <h3 className="font-black text-gray-900 text-sm tracking-tight mb-10">Agendados para Hoje</h3>
                    <div className="space-y-10 relative">
                        {scheduledForToday.length > 0 && <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-slate-100" />}
                        {scheduledForToday.length > 0 ? (
                            scheduledForToday.map((s, i) => (
                                <div key={i} className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-brand/10 border-2 border-white shadow-sm" />
                                    <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-1.5">{s.time}</p>
                                    <h4 className="text-sm font-bold text-gray-900 leading-tight truncate">{s.title}</h4>
                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight mt-1">{s.networks.join(' • ')}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-300 font-bold text-sm text-center py-10">Nenhum agendamento para hoje.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAnalyticsTab = () => {
        const totalImpressions = publishedPosts.reduce((acc, p) => acc + p.impressions, 0);
        const totalShares = totalPublished * 3;
        
        return (
            <div className="space-y-12 animate-in fade-in duration-300 text-left">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div><h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Relatórios de Performance</h2><p className="text-sm text-gray-400 font-medium">Acompanhe seu crescimento real em escala.</p></div>
                    <div className="flex items-center gap-1 bg-white border border-gray-100 p-1 rounded-2xl shadow-sm overflow-x-auto w-full md:w-auto">
                        {['7 DIAS', '30 DIAS', '90 DIAS'].map(range => (
                            <button key={range} onClick={() => setAnalyticsTimeRange(range)} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${analyticsTimeRange === range ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400 hover:text-gray-900'}`}>{range}</button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'IMPRESSÕES', value: totalImpressions > 1000 ? `${(totalImpressions/1000).toFixed(1)}k` : totalImpressions.toString(), trend: totalPublished > 0 ? '+14.2%' : '0%', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-50/50' },
                        { label: 'NOVOS SEGS.', value: totalFollowers > 1000 ? `${(totalFollowers/1000).toFixed(1)}k` : totalFollowers.toString(), trend: totalPublished > 0 ? '+8.1%' : '0%', icon: UserPlus, color: 'text-purple-500', bg: 'bg-purple-50/50' },
                        { label: 'ENGAJAMENTO', value: `${avgEngagement}%`, trend: totalPublished > 0 ? '-2.4%' : '0%', icon: ArrowRight, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
                        { label: 'SHARES', value: totalShares.toString(), trend: totalPublished > 0 ? '+22.5%' : '0%', icon: Share2, color: 'text-orange-500', bg: 'bg-orange-50/50' }
                    ].map((m, i) => (
                        <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm relative group overflow-hidden">
                            <div className={`absolute top-10 right-10 flex items-center gap-1.5 text-[11px] font-black ${m.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{m.trend}</div>
                            <div className={`w-12 h-12 ${m.bg} ${m.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}><m.icon size={22} /></div>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3">{m.label}</p><p className="text-3xl font-black text-gray-900 leading-none">{m.value}</p>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-8 bg-white rounded-[40px] border border-gray-100 shadow-sm p-12 overflow-hidden">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-4">
                            <h3 className="font-black text-gray-900 text-[15px] uppercase tracking-widest">Crescimento de Audiência</h3>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-brand" /><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Seguidores</span></div>
                                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-slate-200" /><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engajamento</span></div>
                            </div>
                        </div>
                        <div className="h-64 border-b border-l border-slate-50 flex items-end justify-between px-6">
                            {['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'].map(m => (
                                <div key={m} className="flex flex-col items-center gap-4">
                                    <div className={`w-2 bg-slate-50 rounded-t-full transition-all duration-700 ${totalPublished > 0 ? 'h-24 hover:bg-brand/20' : 'h-2'}`} />
                                    <span className="text-[9px] font-black text-slate-300 tracking-widest">{m}</span>
                                </div>
                            ))}
                        </div>
                        {totalPublished === 0 && <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-6">Aguardando primeiros posts para gerar gráfico</p>}
                    </div>
                    <div className="lg:col-span-4 bg-white rounded-[40px] border border-gray-100 shadow-sm p-12 flex flex-col">
                        <h3 className="font-black text-gray-900 text-[15px] uppercase tracking-widest mb-12">Performance por Canal</h3>
                        <div className="space-y-10 flex-1">
                            {totalPublished > 0 ? (
                                [{ network: 'Instagram', percentage: 78, trend: '+15%', icon: <InstagramIcon size={18} /> }, { network: 'TikTok', percentage: 94, trend: '+24%', icon: <TikTokIcon size={18} /> }, { network: 'YouTube', percentage: 52, trend: '-2%', icon: <YouTubeIcon size={18} /> }].map((item, i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="flex justify-between items-center"><div className="flex items-center gap-3">{item.icon}<span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{item.network}</span></div><span className={`text-[10px] font-black ${item.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{item.trend}</span></div>
                                        <div className="h-2 bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-brand rounded-full transition-all duration-1000" style={{ width: `${item.percentage}%` }} /></div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-300 font-bold text-center py-20 uppercase tracking-widest text-[10px]">Sem dados por canal</p>
                            )}
                        </div>
                        <button className="w-full py-5 border border-slate-100 bg-slate-50/50 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 transition-all mt-12">Detalhar Canais</button>
                    </div>
                </div>
            </div>
        );
    };

    const renderIntegrationsTab = () => (
        <div className="animate-in fade-in duration-300 text-left space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-2">
                <div className="space-y-1"><h2 className="text-3xl font-bold text-gray-900 tracking-tight">Perfis Conectados</h2><p className="text-[13px] text-gray-400 font-medium">Gerencie múltiplos perfis sem limites por plataforma.</p></div>
                <button onClick={handleAddProfileClick} className="w-full sm:w-auto bg-brand text-white px-8 py-4 rounded-[18px] font-bold text-sm shadow-xl shadow-brand/20 flex items-center justify-center gap-2 active:scale-95 transition-all"><Plus size={18} strokeWidth={2.5} /> Adicionar novo perfil</button>
            </div>
            {profiles.length > 0 ? (
                <div className="bg-white rounded-[32px] border border-gray-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
                    <div className="px-10 py-7 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3"><Users className="text-gray-300" size={18} /><span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">SEUS PERFIS</span></div>
                        <div className="flex items-center gap-4"><span className="bg-brand/10 text-brand text-[9px] font-bold uppercase px-3 py-1.5 rounded-lg tracking-widest border border-brand/5">PLANO INICIANTE</span><span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{profiles.length} / 3 PERFIS ATIVOS</span></div>
                    </div>
                    <div className="divide-y divide-gray-50">{profiles.map((p) => (
                        <div key={p.id} className="px-10 py-8 flex items-center gap-6 group hover:bg-gray-50/30 transition-colors flex-wrap sm:flex-nowrap">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                                {p.network === 'Instagram' && <InstagramIcon size={28} />}
                                {p.network === 'TikTok' && <TikTokIcon size={28} />}
                                {p.network === 'X' && <XIconLogo size={24} />}
                                {p.network === 'YouTube' && <YouTubeIcon size={28} />}
                                {p.network === 'Facebook' && <Facebook size={24} className="text-blue-600" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="text-[15px] font-black text-gray-900 tracking-tight leading-none">{p.displayName}</h4>
                                    <span className="bg-[#eefcf4] text-[#22c55e] text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">ATIVO</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">@{p.username.replace('@', '')} • {p.network}</p>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end mt-4 sm:mt-0">
                                <button className="w-10 h-10 bg-gray-50/80 text-gray-300 rounded-xl flex items-center justify-center hover:bg-brand/5 hover:text-brand transition-all shadow-sm">
                                    <Sliders size={18} />
                                </button>
                                <button onClick={() => setProfiles(profiles.filter(pr => pr.id !== p.id))} className="w-10 h-10 bg-gray-50/80 text-gray-300 rounded-xl flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}</div>
                </div>
            ) : (
                <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-20 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-8"><LinkIcon size={32} className="text-slate-200" /></div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">Nenhuma conta conectada</h3>
                    <p className="text-sm text-gray-400 font-medium max-w-sm mb-10 leading-relaxed">Conecte sua primeira rede social para começar a automatizar sua presença digital.</p>
                    <button onClick={handleAddProfileClick} className="bg-brand text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all">Conectar Agora</button>
                </div>
            )}
        </div>
    );

    const renderSettingsTab = () => (
        <div className="text-left space-y-10 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div><h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Configurações</h2><p className="text-sm text-gray-400 font-medium">Gerencie suas preferências de perfil e conta.</p></div>
            <div className="bg-white rounded-[40px] border border-gray-100 p-12 space-y-12 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b border-slate-50 relative">
                    <div className="w-20 h-20 bg-brand/5 rounded-[28px] flex items-center justify-center text-brand text-2xl font-black border border-brand/5 shadow-inner overflow-hidden">
                        {userAvatar ? <img src={userAvatar} className="w-full h-full object-cover" /> : userName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">{userName}</h3>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                            <span className="bg-brand/10 text-brand text-[8px] font-black uppercase px-2 py-1 rounded-md tracking-widest">PLANO PRO</span>
                            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tight">• ATIVO DESDE JAN 2026</span>
                        </div>
                        <button onClick={() => avatarInputRef.current?.click()} className="text-brand text-[11px] font-black uppercase tracking-widest pt-3 hover:underline">ALTERAR AVATAR</button>
                        <input type="file" ref={avatarInputRef} hidden accept="image/*" onChange={handleAvatarChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">NOME COMPLETO</label>
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-brand/30 transition-all" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">E-MAIL</label>
                        <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-brand/30 transition-all" />
                    </div>
                </div>
                <div className="pt-8 space-y-6">
                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">GERENCIAMENTO DO PLANO</label>
                    <div className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/20 shrink-0"><Zap size={24} strokeWidth={3} /></div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2"><h4 className="font-black text-gray-900 text-[15px]">Plano Pro</h4><span className="bg-blue-100 text-brand text-[8px] font-black uppercase px-1.5 py-0.5 rounded tracking-tighter">ATUAL</span></div>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">PRÓXIMA RENOVAÇÃO: 15/02/2026</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <button className="bg-white border border-slate-200 text-slate-500 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"><RotateCcw size={14} /> RENOVAR</button>
                            <button className="bg-white border border-slate-200 text-slate-500 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">MUDAR PLANO</button>
                        </div>
                    </div>
                </div>
                <div className="pt-12 flex flex-col sm:flex-row justify-end gap-6 border-t border-slate-50">
                    <button onClick={() => {setUserName('John Doe'); setUserEmail('john@example.com');}} className="text-slate-300 text-[11px] font-black uppercase tracking-widest hover:text-slate-500 transition-colors py-2">DESCARTAR</button>
                    <button onClick={handleSaveSettings} className="bg-brand text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-brand/20 active:scale-95 transition-all">SALVAR ALTERAÇÕES</button>
                </div>
            </div>
            <div className="bg-rose-50/30 border border-rose-100/50 rounded-[40px] p-10 flex items-center justify-between group hover:bg-rose-50/50 transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-rose-100/50 text-rose-500 rounded-2xl flex items-center justify-center shrink-0 border border-rose-200/20"><Trash2 size={20} /></div>
                    <div className="space-y-1">
                        <h4 className="font-black text-rose-500 text-[15px]">Excluir Conta</h4>
                        <p className="text-[11px] text-rose-400 font-bold tracking-tight">Esta ação é irreversível e apagará todos os seus dados.</p>
                    </div>
                </div>
                <ChevronRight size={24} className="text-rose-200 group-hover:translate-x-1 transition-transform hidden sm:block" />
            </div>
        </div>
    );

    const renderRealPreview = () => {
        const currentFile = mediaFiles[previewIndex] || mediaFiles[0];
        
        // --- Overlay do Instagram Reels ---
        if (postType === 'reels') {
            return (
                <div className="absolute inset-0 z-10 flex flex-col pointer-events-none text-white overflow-hidden">
                    <div className="flex justify-between items-center p-6 pt-10 w-full drop-shadow-md">
                        <ArrowLeft size={24} />
                        <span className="font-bold text-sm">Reels</span>
                        <Camera size={24} />
                    </div>
                    <div className="mt-auto p-6 space-y-4 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-300 border border-white/20" />
                            <span className="text-[13px] font-black">{userName.toLowerCase().replace(' ', '_')}</span>
                            <button className="text-[10px] font-bold border border-white rounded-md px-2 py-0.5 ml-1">Seguir</button>
                        </div>
                        <p className="text-[11px] font-medium line-clamp-2 max-w-[80%]">{legend || 'Sua legenda aparecerá aqui...'}</p>
                        <div className="flex items-center gap-2 text-white/90 bg-black/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-md">
                            <Music2 size={12} />
                            <span className="text-[10px] font-bold tracking-tight">Som original • {userName.split(' ')[0]}</span>
                        </div>
                    </div>
                    <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20 pointer-events-none">
                        <div className="flex flex-col items-center gap-1"><Heart size={28} className="fill-white" /><span className="text-[11px] font-bold">12k</span></div>
                        <div className="flex flex-col items-center gap-1"><MessageCircle size={28} className="fill-white" /><span className="text-[11px] font-bold">482</span></div>
                        <SendIcon size={26} className="rotate-[-10deg]" />
                        <MoreVertical size={24} />
                        <div className="w-8 h-8 rounded-md border-2 border-white overflow-hidden"><div className="w-full h-full bg-gradient-to-tr from-brand to-pink-500" /></div>
                    </div>
                </div>
            );
        }

        // --- Overlay do TikTok ---
        if (postType === 'tiktok') {
            return (
                <div className="absolute inset-0 z-10 flex flex-col pointer-events-none text-white overflow-hidden">
                    <div className="flex justify-center items-center gap-6 p-6 pt-10 w-full drop-shadow-md">
                        <span className="text-sm font-bold opacity-60">Seguindo</span>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold">Para você</span>
                            <div className="w-5 h-0.5 bg-white mt-1 rounded-full" />
                        </div>
                    </div>
                    <div className="mt-auto p-4 pb-8 space-y-3 bg-gradient-to-t from-black/50 to-transparent">
                        <h4 className="text-[15px] font-black">@{userName.toLowerCase().replace(' ', '')}</h4>
                        <p className="text-[11px] font-medium line-clamp-3 leading-relaxed max-w-[85%]">{legend || 'Sua legenda aparecerá aqui...'}</p>
                        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap pt-1">
                            <Music2 size={12} className="shrink-0" />
                            <div className="text-[10px] font-medium animate-marquee">Som original - {userName} • UniPost App</div>
                        </div>
                    </div>
                    <div className="absolute right-4 bottom-20 flex flex-col items-center gap-5 z-20">
                        <div className="relative mb-2">
                            <div className="w-11 h-11 rounded-full border border-white overflow-hidden bg-slate-300" />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#ff0050] rounded-full flex items-center justify-center border border-white"><Plus size={10} strokeWidth={4} /></div>
                        </div>
                        <div className="flex flex-col items-center gap-0.5"><Heart size={30} className="fill-[#ff0050] text-[#ff0050]" /><span className="text-[10px] font-bold">82.5k</span></div>
                        <div className="flex flex-col items-center gap-0.5"><MessageCircle size={30} className="fill-white" /><span className="text-[10px] font-bold">1,240</span></div>
                        <div className="flex flex-col items-center gap-0.5"><Bookmark size={30} className="fill-white" /><span className="text-[10px] font-bold">428</span></div>
                        <div className="flex flex-col items-center gap-0.5"><ArrowRight size={30} className="rotate-[-30deg]" /><span className="text-[10px] font-bold">Share</span></div>
                        <div className="w-10 h-10 rounded-full border-4 border-gray-800 bg-gray-900 flex items-center justify-center overflow-hidden animate-spin-slow">
                            <div className="w-full h-full bg-gradient-to-tr from-gray-700 to-gray-400" />
                        </div>
                    </div>
                </div>
            );
        }

        // --- Overlay do YouTube Shorts ---
        if (postType === 'shorts') {
            return (
                <div className="absolute inset-0 z-10 flex flex-col pointer-events-none text-white overflow-hidden">
                    <div className="flex justify-end p-6 pt-10 w-full">
                        <Search size={24} />
                    </div>
                    <div className="mt-auto p-4 pb-6 space-y-4 bg-gradient-to-t from-black/40 to-transparent">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-400 shrink-0" />
                            <span className="text-[11px] font-black truncate max-w-[120px]">@{userName.split(' ')[0]}</span>
                            <button className="bg-white text-black text-[9px] font-black px-3 py-1.5 rounded-full uppercase shrink-0 shadow-lg">Inscrever-se</button>
                        </div>
                        <p className="text-[12px] font-medium line-clamp-2 leading-relaxed max-w-[80%]">{legend || 'Sua legenda aparecerá aqui...'}</p>
                    </div>
                    <div className="absolute right-3 bottom-12 flex flex-col items-center gap-6 z-20">
                        <div className="flex flex-col items-center gap-1"><ThumbsUp size={24} /><span className="text-[10px] font-bold">Gostei</span></div>
                        <div className="flex flex-col items-center gap-1"><ThumbsDown size={24} /><span className="text-[10px] font-bold">Não gostei</span></div>
                        <div className="flex flex-col items-center gap-1"><MessageCircle size={24} /><span className="text-[10px] font-bold">82</span></div>
                        <div className="flex flex-col items-center gap-1"><ArrowRight size={24} /><span className="text-[10px] font-bold">Compartilhar</span></div>
                        <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden bg-slate-500 shadow-xl" />
                    </div>
                </div>
            );
        }

        // --- Post Padrão (Instagram Feed/Carrossel) - Estilo Imagem 2 ---
        return (
            <div className="absolute top-0 left-0 w-full h-full bg-white pointer-events-none flex flex-col z-10">
                {/* Header do Post */}
                <div className="px-4 py-3 flex items-center justify-between bg-white border-b border-slate-50">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-50 flex items-center justify-center overflow-hidden">
                             {userAvatar ? <img src={userAvatar} className="w-full h-full object-cover" /> : <User size={16} className="text-slate-300" />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-gray-900 tracking-tight leading-none">{userName.toLowerCase().replace(' ', '_')}</span>
                            <span className="text-[10px] text-gray-500 mt-0.5 leading-none">Patrocinado</span>
                        </div>
                    </div>
                    <MoreHorizontal size={18} className="text-gray-400" />
                </div>
                
                {/* Mídia Container (A mídia real é renderizada no renderCreateTab acima desta camada) */}
                <div className="flex-1 bg-white relative overflow-hidden flex items-center justify-center">
                    {mediaFiles.length === 0 && (
                        <div className="flex flex-col items-center gap-3 text-slate-300">
                            <Camera size={40} strokeWidth={1} />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Prévia do Conteúdo</span>
                        </div>
                    )}
                </div>
                
                {/* Barra de Interação e Legenda */}
                <div className="p-4 bg-white">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex gap-4">
                            <Heart size={24} className="text-gray-900" />
                            <MessageCircle size={24} className="text-gray-900" />
                            <SendIcon size={22} className="text-gray-900 -rotate-12" />
                        </div>
                        <div className="flex gap-1">
                             {(postType === 'carousel' || mediaFiles.length > 1) && mediaFiles.map((_, i) => (
                                 <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${previewIndex === i ? 'bg-blue-500' : 'bg-slate-200'}`} />
                             ))}
                        </div>
                        <Bookmark size={24} className="text-gray-900" />
                    </div>
                    <div className="space-y-1.5 overflow-hidden">
                        <p className="text-[13px] font-medium leading-[1.4] line-clamp-3">
                            <span className="font-bold mr-1.5">{userName.toLowerCase().replace(' ', '_')}</span> 
                            {legend || 'Sua legenda aparecerá aqui...'}
                        </p>
                        {includeHashtags && <p className="text-[13px] text-[#00376b] font-medium">{hashtags}</p>}
                    </div>
                </div>
            </div>
        );
    };

    const renderCreateTab = () => (
        <div className="animate-in fade-in duration-300 text-left space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Criar novo post</h2>
                    <p className="text-sm text-gray-400 font-medium">Selecione o formato e comece a criar seu conteúdo.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start pb-20">
                <div className="xl:col-span-7 space-y-8">
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 md:p-10 shadow-sm space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">FORMATO DO CONTEÚDO</label>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { id: 'post', label: 'Feed', icon: InstagramIcon },
                                    { id: 'carousel', label: 'Carrossel', icon: InstagramIcon },
                                    { id: 'reels', label: 'Reels', icon: InstagramIcon },
                                    { id: 'tiktok', label: 'TikTok Video', icon: TikTokIcon },
                                    { id: 'shorts', label: 'YouTube Shorts', icon: YouTubeIcon }
                                ].map(type => {
                                    const IconComponent = type.icon;
                                    return (
                                        <button 
                                            key={type.id} 
                                            onClick={() => { setPostType(type.id as any); setPreviewIndex(0); setIsPreviewPaused(false); }}
                                            className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-bold transition-all ${postType === type.id ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-[1.02]' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                        >
                                            <IconComponent size={18} />
                                            {type.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end px-1">
                                <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">MÍDIAS DO POST</label>
                                <span className="text-[10px] text-slate-300 font-bold">{mediaFiles.length} de 10 arquivos</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                                {mediaFiles.map((file, idx) => (
                                    <div 
                                        key={idx} 
                                        draggable={postType === 'carousel'}
                                        onDragStart={() => handleDragStart(idx)}
                                        onDragOver={handleDragOver}
                                        onDrop={() => handleDrop(idx)}
                                        className={`aspect-square rounded-2xl bg-slate-50 relative group border-2 ${draggedItemIndex === idx ? 'opacity-50 border-brand' : 'border-transparent'}`}
                                    >
                                        {file.type === 'video' ? (
                                            <video src={file.url} className="w-full h-full object-cover rounded-2xl" muted />
                                        ) : (
                                            <img src={file.url} className="w-full h-full object-cover rounded-2xl" alt="" />
                                        )}
                                        <button 
                                            onClick={() => setMediaFiles(mediaFiles.filter((_, i) => i !== idx))}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20"
                                        >
                                            <XIcon size={12} strokeWidth={3} />
                                        </button>
                                        {(postType === 'carousel' || mediaFiles.length > 1) && (
                                            <div className="absolute bottom-2 left-2 w-5 h-5 bg-black/50 backdrop-blur-md text-white text-[8px] font-black rounded-md flex items-center justify-center">
                                                {idx + 1}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {mediaFiles.length < 10 && (
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="aspect-square rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 text-slate-300 hover:border-brand/30 hover:text-brand hover:bg-brand/5 transition-all"
                                    >
                                        <Plus size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-tighter">Adicionar</span>
                                    </button>
                                )}
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                hidden 
                                multiple 
                                accept="image/*,video/*" 
                                onChange={(e) => {
                                    const files = Array.from(e.target.files || []);
                                    const newFiles = files.map(f => ({
                                        url: URL.createObjectURL(f),
                                        type: f.type.startsWith('video') ? 'video' : 'image'
                                    }));
                                    setMediaFiles([...mediaFiles, ...newFiles]);
                                }} 
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">LEGENDA DO POST</label>
                                <button onClick={() => setIsAIModalOpen(true)} className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-widest hover:underline">
                                    <Sparkles size={14} /> Assistente IA
                                </button>
                            </div>
                            <textarea 
                                value={legend}
                                onChange={(e) => setLegend(e.target.value)}
                                placeholder="O que você está pensando?..." 
                                className="w-full h-40 bg-slate-50/50 border border-slate-100 rounded-3xl p-8 text-sm font-medium outline-none focus:bg-white focus:border-brand transition-all resize-none shadow-inner"
                            />
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between p-1">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={includeHashtags} onChange={e => setIncludeHashtags(e.target.checked)} className="custom-checkbox" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Incluir hashtags sugeridas</span>
                                    </label>
                                </div>
                                {includeHashtags && (
                                    <input 
                                        type="text" 
                                        value={hashtags}
                                        onChange={e => setHashtags(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-xs font-bold text-brand outline-none" 
                                        placeholder="#marketing #digital #growth"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button 
                            disabled={mediaFiles.length === 0}
                            onClick={() => { setIsPostNowFlow(false); setSchedulingStep('date-time'); }}
                            className="flex-1 bg-white border-2 border-slate-100 text-slate-500 py-5 rounded-[28px] font-black text-sm hover:border-brand/30 hover:text-brand transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            <Clock size={20} /> Agendar Postagem
                        </button>
                        <button 
                            disabled={mediaFiles.length === 0}
                            onClick={() => { setIsPostNowFlow(true); setSchedulingStep('platforms'); }}
                            className="flex-1 bg-brand text-white py-5 rounded-[28px] font-black text-sm shadow-xl shadow-brand/20 hover:bg-brand-600 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                        >
                            <SendIcon size={20} /> Publicar Agora
                        </button>
                    </div>
                </div>

                {/* --- MOCKUP DE CELULAR (APENAS DESKTOP - hidden xl:flex) --- */}
                <div className="xl:col-span-5 hidden xl:flex flex-col items-center">
                    <div className="bg-slate-900 rounded-[60px] p-4 md:p-6 border-[12px] border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] aspect-[9/18.5] relative overflow-hidden flex flex-col w-full max-w-[340px]">
                        {/* Notch/Status Bar */}
                        <div className="flex justify-between items-center px-6 pt-3 pb-4 text-white z-20">
                            <span className="text-[11px] font-bold">12:30</span>
                            <div className="flex gap-2 items-center">
                                <Activity size={12} />
                                <Zap size={12} strokeWidth={3} />
                            </div>
                        </div>
                        
                        <div className="flex-1 bg-white rounded-[40px] overflow-hidden relative flex flex-col">
                            {/* OVERLAY ESPECÍFICO DE CADA REDE (ESTILO IMAGEM 2) */}
                            {renderRealPreview()}
                            
                            {/* MEDIA CONTENT INTEGRADO NA PRÉVIA */}
                            <div 
                                className="absolute inset-x-0 top-[60px] bottom-[140px] bg-white flex items-center justify-center cursor-pointer group z-[5]"
                                onClick={() => mediaFiles.length > 0 && setIsPreviewPaused(!isPreviewPaused)}
                            >
                                {mediaFiles.length > 0 ? (
                                    <div className="w-full h-full relative">
                                        {mediaFiles[previewIndex].type === 'video' ? (
                                            <video 
                                                ref={videoRef} 
                                                src={mediaFiles[previewIndex].url} 
                                                className="w-full h-full object-cover" 
                                                autoPlay 
                                                loop 
                                                muted={isPreviewMuted} 
                                            />
                                        ) : (
                                            <img src={mediaFiles[previewIndex].url} className="w-full h-full object-cover" alt="" />
                                        )}
                                        
                                        {/* Play Overlay if Paused */}
                                        {isPreviewPaused && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-20">
                                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 scale-110">
                                                    <Play size={32} className="ml-1 fill-white" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Setas de Navegação (Para Todos Formatos com Múltiplas Mídias) */}
                                        {mediaFiles.length > 1 && (
                                            <>
                                                <button onClick={(e) => { e.stopPropagation(); setPreviewIndex(prev => Math.max(0, prev - 1)); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-sm border border-slate-100 active:scale-90"><ChevronLeft size={16} strokeWidth={3} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); setPreviewIndex(prev => Math.min(mediaFiles.length - 1, prev + 1)); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-sm border border-slate-100 active:scale-90"><ChevronRight size={16} strokeWidth={3} /></button>
                                            </>
                                        )}

                                        {mediaFiles[previewIndex].type === 'video' && (
                                            <button onClick={(e) => { e.stopPropagation(); setIsPreviewMuted(!isPreviewMuted); }} className="absolute top-4 right-4 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg z-20">
                                                {isPreviewMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                            </button>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        {/* Home Indicator */}
                        <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mb-2 mt-4" />
                    </div>
                    <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-8 mb-12 xl:mb-0">SIMULAÇÃO DE VISUALIZAÇÃO EM DISPOSITIVO MÓVEL</p>
                </div>
            </div>
        </div>
    );

    const renderScheduleTab = () => (
        <div className="animate-in fade-in duration-300 text-left space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Agendamentos</h2>
                    <p className="text-sm text-gray-400 font-medium">Visualize e gerencie seus próximos posts.</p>
                </div>
                <button onClick={() => setActiveTab('create')} className="w-full md:w-auto bg-brand text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-brand/20 flex items-center justify-center gap-3 active:scale-95 transition-all">
                    <Plus size={20} strokeWidth={3} /> Novo Post
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-12">
                    {scheduledPosts.length > 0 ? (
                        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-10 py-7 border-b border-gray-50 flex items-center justify-between bg-slate-50/30">
                                <h3 className="font-black text-gray-900 text-xs uppercase tracking-widest">Lista de Agendamentos</h3>
                                <span className="bg-brand/10 text-brand text-[9px] font-black uppercase px-3 py-1.5 rounded-lg tracking-widest border border-brand/5">{scheduledPosts.length} POSTS PENDENTES</span>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {scheduledPosts.map((post) => (
                                    <div key={post.id} className="px-10 py-8 flex items-center gap-8 hover:bg-slate-50/50 transition-colors group">
                                        <div className="w-20 h-20 rounded-[24px] overflow-hidden border border-slate-100 shrink-0 bg-slate-50 flex items-center justify-center relative shadow-sm">
                                            {post.imageUrl ? (
                                                post.mediaType === 'video' ? (
                                                    <video src={post.imageUrl} className="w-full h-full object-cover" muted />
                                                ) : (
                                                    <img src={post.imageUrl} className="w-full h-full object-cover" alt="" />
                                                )
                                            ) : (
                                                <ImageIcon size={24} className="text-slate-200" />
                                            )}
                                            {post.mediaType === 'video' && <div className="absolute inset-0 flex items-center justify-center bg-black/10"><Play size={20} className="text-white fill-white" /></div>}
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-[15px] font-black text-gray-900 truncate tracking-tight">{post.title || 'Sem título'}</h4>
                                                <div className="flex gap-1.5">
                                                    {post.networks.map(net => {
                                                        const IconMap: any = {
                                                            Instagram: InstagramIcon,
                                                            TikTok: TikTokIcon,
                                                            YouTube: YouTubeIcon,
                                                            X: XIconLogo,
                                                            Facebook: Facebook
                                                        };
                                                        const SNetIcon = IconMap[net] || Globe;
                                                        return (
                                                            <div key={net} className="w-5 h-5 rounded-md bg-white border border-slate-100 flex items-center justify-center shadow-xs">
                                                                {net === 'Facebook' ? <Facebook size={10} className="text-blue-600" /> : <SNetIcon size={12} />}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Calendar size={14} />
                                                    <span className="text-[11px] font-bold uppercase tracking-tight">{post.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Clock size={14} />
                                                    <span className="text-[11px] font-bold uppercase tracking-tight">{post.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button className="w-11 h-11 bg-white border border-slate-100 text-slate-300 rounded-2xl flex items-center justify-center hover:bg-slate-50 hover:text-gray-900 transition-all shadow-sm"><Pencil size={18} /></button>
                                            <button 
                                                onClick={() => setScheduledPosts(scheduledPosts.filter(p => p.id !== post.id))}
                                                className="w-11 h-11 bg-white border border-slate-100 text-slate-300 rounded-2xl flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-24 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8 border border-slate-50 shadow-inner">
                                <CalendarDays size={40} className="text-slate-200" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Nenhum post agendado</h3>
                            <p className="text-sm text-gray-400 font-medium max-w-sm mb-12 leading-relaxed">Sua agenda está vazia. Comece a planejar seu conteúdo para manter sua audiência engajada.</p>
                            <button onClick={() => setActiveTab('create')} className="bg-brand text-white px-12 py-5 rounded-[24px] font-black text-sm shadow-xl shadow-brand/20 active:scale-95 transition-all flex items-center gap-3">
                                <PenSquare size={20} /> Criar meu primeiro post
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row font-sans text-gray-900">
            {/* --- SIDEBAR DESKTOP --- */}
            <aside className="w-72 bg-white border-r border-slate-100 hidden lg:flex flex-col p-8 fixed h-full z-30">
                <div className="flex items-center gap-3 mb-16 px-4"><img src={LOGO_URL} alt={APP_NAME} className="h-10 w-10 rounded-xl shadow-lg" /><span className="font-extrabold text-2xl tracking-tighter text-gray-900">UniPost</span></div>
                <nav className="space-y-2 flex-1">{Object.entries(labels).map(([id, label]) => {
                    const Icon = id === 'overview' ? LayoutDashboard : id === 'create' ? PenSquare : id === 'schedule' ? Calendar : id === 'analytics' ? BarChart2 : id === 'integrations' ? LinkIcon : Settings;
                    return (<button key={id} onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === id ? 'bg-brand text-white shadow-xl shadow-brand/20 translate-x-1' : 'text-slate-400 hover:bg-slate-50'}`}><Icon size={20} /> {label}</button>);
                })}</nav>
                <button onClick={() => onNavigate('landing')} className="mt-auto flex items-center gap-4 px-6 py-4 text-slate-300 font-bold text-[10px] uppercase tracking-widest hover:text-rose-500 transition-colors"><LogOut size={18} /> Sair</button>
            </aside>

            {/* --- MOBILE NAV (OVERLAY) --- */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[1000] lg:hidden animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                    <aside className="absolute top-0 left-0 bottom-0 w-72 bg-white flex flex-col p-8 shadow-2xl animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-3"><img src={LOGO_URL} alt={APP_NAME} className="h-8 w-8 rounded-lg shadow-md" /><span className="font-extrabold text-xl tracking-tighter text-gray-900">UniPost</span></div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300"><XIcon size={20} /></button>
                        </div>
                        <nav className="space-y-1 flex-1">{Object.entries(labels).map(([id, label]) => {
                            const Icon = id === 'overview' ? LayoutDashboard : id === 'create' ? PenSquare : id === 'schedule' ? Calendar : id === 'analytics' ? BarChart2 : id === 'integrations' ? LinkIcon : Settings;
                            return (<button key={id} onClick={() => {setActiveTab(id); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === id ? 'bg-brand text-white shadow-xl shadow-brand/20' : 'text-slate-400 hover:bg-slate-50'}`}><Icon size={20} /> {label}</button>);
                        })}</nav>
                        <button onClick={() => onNavigate('landing')} className="mt-auto flex items-center gap-4 px-6 py-4 text-slate-300 font-bold text-[10px] uppercase tracking-widest hover:text-rose-500 transition-colors"><LogOut size={18} /> Sair</button>
                    </aside>
                </div>
            )}

            <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
                <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-20 px-6 sm:px-10 py-6 border-b border-slate-100 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 lg:hidden text-gray-500 hover:text-brand bg-slate-50 rounded-xl transition-colors"><MenuIcon size={24} /></button>
                        <h1 className="text-[11px] font-black text-gray-900 uppercase tracking-widest leading-none">{labels[activeTab]}</h1>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8">
                        <div className="relative hidden xl:block"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} /><input type="text" placeholder="Buscar posts..." className="bg-slate-50/50 border border-slate-100 rounded-2xl py-3 pl-12 pr-6 text-[11px] font-bold focus:outline-none w-80 shadow-inner" /></div>
                        <button className="p-3 text-slate-300 bg-slate-50 rounded-2xl hover:text-brand relative transition-all border border-slate-100/50"><Bell size={20} /><span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" /></button>
                        <div onClick={() => setActiveTab('settings')} className="h-11 w-11 bg-brand rounded-2xl flex items-center justify-center text-white text-[11px] font-black shadow-lg shadow-brand/30 cursor-pointer border-2 border-white uppercase overflow-hidden">
                            {userAvatar ? <img src={userAvatar} className="w-full h-full object-cover" /> : userName.substring(0, 2).toUpperCase()}
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-6 sm:p-10 md:p-14 bg-slate-50/30">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'overview' ? renderOverviewTab() : 
                         activeTab === 'create' ? renderCreateTab() :
                         activeTab === 'schedule' ? renderScheduleTab() :
                         activeTab === 'analytics' ? renderAnalyticsTab() :
                         activeTab === 'integrations' ? renderIntegrationsTab() :
                         renderSettingsTab()}
                    </div>
                </main>
            </div>

            {/* --- MODAIS PERFIS --- */}
            {addProfileStep !== 'none' && (
                <div className="fixed inset-0 z-[1500] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-[640px] rounded-[52px] p-8 md:p-14 text-center shadow-2xl relative">
                        <button onClick={() => setAddProfileStep('none')} className="absolute top-8 right-8 text-slate-300 hover:text-gray-900 transition-colors"><XIcon size={24} /></button>
                        {addProfileStep === 'select' ? (
                            <>
                                <h3 className="text-lg md:text-xl font-[900] text-gray-900 mb-8 md:mb-10 tracking-tight uppercase tracking-widest leading-none">Conectar Novo Perfil</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { id: 'Instagram', icon: InstagramIcon },
                                        { id: 'TikTok', icon: TikTokIcon },
                                        { id: 'X', icon: XIconLogo },
                                        { id: 'YouTube', icon: YouTubeIcon },
                                        { id: 'Facebook', icon: Facebook }
                                    ].map(net => {
                                        const NetIcon = net.icon;
                                        return (
                                            <button 
                                                key={net.id} 
                                                onClick={() => { setSelectedNetwork(net.id as any); setAddProfileStep('details'); }} 
                                                className="bg-white border border-gray-100 p-6 md:p-8 rounded-[32px] flex flex-col items-center gap-4 hover:shadow-[0_15px_30px_-10px_rgba(0,106,255,0.12)] hover:border-brand/20 transition-all active:scale-95 group"
                                            >
                                                <div className="group-hover:scale-110 transition-transform duration-300">
                                                    {net.id === 'Facebook' ? <Facebook size={32} className="text-blue-600" /> : <NetIcon size={32} />}
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-brand transition-colors">{net.id}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center animate-in slide-in-from-right-4 duration-300">
                                <button onClick={() => setAddProfileStep('select')} className="absolute top-10 left-10 text-[10px] font-black text-slate-300 flex items-center gap-2 hover:text-brand transition-colors uppercase tracking-widest"><ArrowLeft size={14} /> Voltar</button>
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-brand/5 rounded-[32px] flex items-center justify-center mb-8 border border-brand/5 shadow-inner">
                                    {selectedNetwork === 'Instagram' ? <InstagramIcon size={40} /> : selectedNetwork === 'TikTok' ? <TikTokIcon size={40} /> : selectedNetwork === 'X' ? <XIconLogo size={32} /> : selectedNetwork === 'YouTube' ? <YouTubeIcon size={40} /> : <Facebook size={40} className="text-blue-600" />}
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 tracking-tight">Quase lá!</h3><p className="text-sm text-slate-400 font-medium mb-10 leading-relaxed px-4 md:px-12 text-center">Qual nome você deseja dar a este perfil do {selectedNetwork}?</p>
                                <div className="w-full space-y-6 text-left">
                                    <div className="space-y-3"><label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">NOME DE EXIBIÇÃO</label><div className="relative group"><Pencil size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" /><input value={newProfileName} onChange={e => setNewProfileName(e.target.value)} type="text" placeholder="Ex: Minha Loja Principal" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 md:py-5 pl-14 pr-8 text-sm font-bold text-gray-900 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all" /></div></div>
                                    <div className="space-y-3"><label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">NOME DE USUÁRIO (OPCIONAL)</label><div className="relative group"><User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" /><input value={newProfileUser} onChange={e => setNewProfileUser(e.target.value)} type="text" placeholder="Ex: @lojamain" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 md:py-5 pl-14 pr-8 text-sm font-bold text-gray-900 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all" /></div></div>
                                    <button onClick={confirmAddProfile} disabled={!newProfileName} className="w-full py-5 bg-brand text-white rounded-[24px] font-black text-sm shadow-xl shadow-brand/20 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-4"><Check size={18} strokeWidth={4} /> Concluir Conexão</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MODAIS IA E AGENDAMENTO */}
            {isAIModalOpen && (
                <div className="fixed inset-0 z-[1500] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-[480px] rounded-[48px] p-12 text-center shadow-2xl relative">
                        <button onClick={() => setIsAIModalOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-gray-900 transition-colors"><XIcon size={24} /></button>
                        <div className="w-16 h-16 bg-brand/5 text-brand rounded-[24px] flex items-center justify-center mx-auto mb-8"><Sparkles size={32} /></div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Gerador de Legendas</h3>
                        <div className="space-y-6 text-left">
                            <textarea 
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                placeholder="Sobre o que é seu post? Ex: Promoção de tênis, bastidores da loja..." 
                                className="w-full h-32 bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm font-medium outline-none focus:bg-white focus:border-brand transition-all" 
                            />
                            <div className="grid grid-cols-2 gap-3">
                                {['Criativo', 'Profissional', 'Engraçado', 'Inspirador'].map(t => (
                                    <button 
                                        key={t} 
                                        onClick={() => setAiTone(t)} 
                                        className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all ${aiTone === t ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <button 
                                onClick={handleAIGenerate} 
                                disabled={!aiPrompt || isGeneratingIA}
                                className={`w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-sm shadow-xl active:scale-95 transition-all mt-4 flex items-center justify-center gap-3 ${isGeneratingIA ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isGeneratingIA ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        GERANDO...
                                    </>
                                ) : 'GERAR NOVAS LEGENDAS'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {schedulingStep === 'date-time' && (
                <div className="fixed inset-0 z-[1400] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-[480px] rounded-[52px] p-8 md:p-12 shadow-2xl relative text-left">
                        <button onClick={() => setSchedulingStep(null)} className="absolute top-10 right-10 text-slate-300 hover:text-gray-900"><XIcon size={24} /></button>
                        <div className="flex items-center gap-3 mb-10"><div className="w-8 h-8 bg-brand/5 text-brand rounded-lg flex items-center justify-center"><Clock size={18} /></div><h3 className="text-xl font-black text-gray-900 tracking-tight leading-none uppercase tracking-widest">Agendar Postagem</h3></div>
                        <div className="space-y-8">
                            <div className="space-y-4"><label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><CalendarDays size={14} /> SELECIONE O DIA</label><div className="relative group"><Calendar onClick={() => dateInputRef.current?.showPicker()} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer hover:text-brand" size={20} /><input ref={dateInputRef} type="date" value={tempDate} onChange={(e) => setTempDate(e.target.value)} className="w-full bg-[#f8fafc] border border-slate-100 rounded-2xl py-4 md:py-5 pl-16 pr-8 text-sm font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all" /></div></div>
                            <div className="space-y-4"><label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><Clock size={14} /> SELECIONE O HORÁRIO</label><div className="relative group"><Clock onClick={() => timeInputRef.current?.showPicker()} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer hover:text-brand" size={20} /><input ref={timeInputRef} type="time" value={tempTime} onChange={(e) => setTempTime(e.target.value)} className="w-full bg-[#f8fafc] border border-slate-100 rounded-2xl py-4 md:py-5 pl-16 pr-8 text-sm font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all" /></div></div>
                            <button onClick={() => setSchedulingStep('platforms')} className="w-full py-5 bg-brand text-white rounded-[32px] font-black text-sm shadow-xl shadow-brand/20 active:scale-95 transition-all flex items-center justify-center gap-3 mt-6">Confirmar Agendamento</button>
                        </div>
                    </div>
                </div>
            )}

            {schedulingStep === 'platforms' && (
                <div className="fixed inset-0 z-[1400] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white w-full max-w-[480px] rounded-[52px] p-8 md:p-12 shadow-2xl relative text-left">
                        <button onClick={() => setSchedulingStep(null)} className="absolute top-10 right-10 text-slate-300 hover:text-gray-900"><XIcon size={24} /></button>
                        <div className="flex flex-col items-center text-center mb-10"><div className="w-16 h-16 bg-[#ebf4ff] text-brand rounded-[28px] flex items-center justify-center mb-8 shadow-sm border border-brand/10"><Globe size={28} /></div><h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 tracking-tight">Onde deseja publicar?</h3><p className="text-sm text-slate-400 font-medium">Selecione os canais de destino para este conteúdo.</p></div>
                        <div className="space-y-4 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">{profiles.length > 0 ? profiles.map(p => (
                            <div key={p.id} onClick={() => setSelectedPlatformIds(prev => prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id])} className={`flex items-center justify-between p-5 rounded-[28px] border-2 cursor-pointer transition-all ${selectedPlatformIds.includes(p.id) ? 'border-brand bg-brand/[0.02]' : 'border-slate-50 hover:bg-slate-50'}`}>
                                <div className="flex items-center gap-4"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">{p.network === 'Instagram' ? <InstagramIcon size={24} /> : p.network === 'TikTok' ? <TikTokIcon size={24} /> : p.network === 'X' ? <XIconLogo size={20} /> : <Facebook size={20} className="text-blue-600" />}</div><div><p className="font-black text-gray-900 text-[14px] leading-none mb-1">{p.network}</p><p className="text-[11px] text-slate-400 font-bold">{p.username}</p></div></div>
                                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlatformIds.includes(p.id) ? 'bg-brand border-brand' : 'border-slate-200'}`}>{selectedPlatformIds.includes(p.id) && <Check size={14} className="text-white" strokeWidth={4} />}</div>
                            </div>
                        )) : <p className="text-center text-sm text-slate-400 py-8 font-bold">Conecte um perfil antes de postar.</p>}</div>
                        <button onClick={publishNow} className="w-full py-5 bg-brand text-white rounded-[32px] font-black text-sm shadow-xl shadow-brand/20 active:scale-95 transition-all flex items-center justify-center gap-3"><SendIcon size={18} /> Confirmar e {isPostNowFlow ? 'Publicar Agora' : 'Agendar Post'}</button>
                    </div>
                </div>
            )}

            {schedulingStep === 'success' && (
                <div className="fixed inset-0 z-[1500] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in zoom-in-95 duration-300">
                    <div className="bg-white w-full max-w-[440px] rounded-[52px] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden"><div className="w-16 h-16 md:w-20 md:h-20 bg-[#f0fdf4] text-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-10 border border-[#dcfce7] shadow-sm"><Check size={40} strokeWidth={3} /></div><h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{isPostNowFlow ? 'Post Publicado!' : 'Post Agendado!'}</h3><p className="text-sm text-slate-400 font-medium mb-12 max-w-[260px] mx-auto">Seu conteúdo foi processado e será publicado automaticamente nos canais selecionados.</p><button onClick={() => { setSchedulingStep(null); setActiveTab(isPostNowFlow ? 'overview' : 'schedule'); setMediaFiles([]); setLegend(''); setHashtags(''); }} className="w-full py-5 bg-brand text-white rounded-[32px] font-black text-sm shadow-xl active:scale-95 transition-all">Continuar Criando</button></div>
                </div>
            )}

            {isLimitModalOpen && (
                <div className="fixed inset-0 z-[1500] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-[440px] rounded-[52px] p-12 text-center shadow-2xl relative overflow-hidden"><button onClick={() => setIsLimitModalOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-gray-900 transition-colors"><XIcon size={24} /></button><div className="w-20 h-20 bg-rose-50 rounded-[32px] flex items-center justify-center mx-auto mb-8"><ZapOff size={32} className="text-rose-500" /></div><h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Limite de perfis atingido!</h3><p className="text-sm text-slate-400 font-medium mb-10 px-4">Você está no <span className="text-gray-900 font-black">Plano Iniciante</span>. Para adicionar mais de 3 perfis, é necessário fazer um upgrade.</p><button className="w-full py-5 bg-brand text-white rounded-[24px] font-black text-sm shadow-xl active:scale-95 transition-all">Fazer Upgrade Agora</button></div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
