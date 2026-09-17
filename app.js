const { useState, useEffect, useMemo, useRef } = React;
// REGLA CRÍTICA: Traemos la base de datos
const db = window.db; 

// --- LOGOS DEL SISTEMA ---
const APP_LOGO_URL = "https://i.imgur.com/YjSvTHr.png"; 
const TICKET_LOGO_URL = "https://i.imgur.com/ytru7Zu.png"; 
const NOVABIT_LOGO_URL = "https://i.imgur.com/Bh3Dm7l.png";
const PASS_ACCESO = "polyfan2026";

// --- ÍCONOS COMPARTIDOS ---
const IconHome = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconClipboard = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 18h6"></path><path d="M9 10h.01"></path></svg>;
const IconPackage = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const IconDollar = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const IconFileText = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const IconUsers = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconPlus = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconTrash = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
const IconEdit = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconClock = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const IconCheck = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconWhatsApp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>;
const IconAlertTriangle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const IconZap = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const IconImage = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
const IconTrendingUp = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const IconWallet = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>;
const IconSparkles = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const IconShield = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;

function NavButton({ icon, label, active, onClick }) { 
  return ( 
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[1.25rem] transition-all duration-300 ${active ? 'bg-[#222] text-[#e2ff00] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] md:scale-110 border border-[#444]' : 'text-gray-500 hover:text-gray-300 hover:scale-105'}`}>
      {icon}
      <span className="text-[8px] uppercase tracking-[0.2em] font-bold mt-1.5">{label}</span>
    </button> 
  ); 
}

function Input({ label, type = "text", value, onChange, placeholder, disabled = false }) { 
  return ( 
    <div className="space-y-1.5 w-full">
      <label className="text-[9px] text-gray-400 uppercase font-bold tracking-widest ml-1">{label}</label>
      <input type={type} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full glass-panel bg-[#0a0a0a]/80 border border-[#333] rounded-xl p-4 text-sm text-white focus:border-[#e2ff00] outline-none transition-all placeholder-gray-700 disabled:opacity-50" />
    </div> 
  ); 
}

// Renderizado de gráficos con protección anti-crashes
function ChartCanvas({ type, data, options, height = 250 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    try {
      if (chartRef.current) chartRef.current.destroy();
      if (window.Chart && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = new window.Chart(ctx, { type, data, options });
      }
    } catch (error) {
      console.error("Error al renderizar el gráfico:", error);
    }
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [type, data, options]);

  return <div style={{ height: `${height}px`, width: '100%', position: 'relative' }}><canvas ref={canvasRef}></canvas></div>;
}

const formatUnidad = (u) => { if(u==='Metros') return 'm'; if(u==='Litros') return 'L'; if(u==='Gramos') return 'g'; return 'u'; };

// --- COMPONENTE PRINCIPAL APP ---
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loggedUser, setLoggedUser] = useState(null);
  const [finanzas, setFinanzas] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [prospectos, setProspectos] = useState([]); 
  const [toastMsg, setToastMsg] = useState(null);
  const [pedidoToEdit, setPedidoToEdit] = useState(null);

  const showToast = (msg, type = 'success') => { 
    setToastMsg({ msg, type }); 
    setTimeout(() => setToastMsg(null), 3500); 
  };

  useEffect(() => {
    if (!loggedUser || !db) return;
    const unsubs = [];
    try {
      unsubs.push(db.collection('finanzas').onSnapshot(snap => setFinanzas(snap.docs.map(d => ({ id: d.id, ...d.data() })))));
      unsubs.push(db.collection('pedidos').onSnapshot(snap => setPedidos(snap.docs.map(d => ({ id: d.id, ...d.data() })))));
      unsubs.push(db.collection('inventario').onSnapshot(snap => setInventario(snap.docs.map(d => ({ id: d.id, ...d.data() })))));
      unsubs.push(db.collection('prospectos').onSnapshot(snap => setProspectos(snap.docs.map(d => ({ id: d.id, ...d.data() })))));
    } catch (error) { console.error("Firebase Error", error); }
    return () => unsubs.forEach(unsub => unsub());
  }, [loggedUser]);

  if (!loggedUser) {
    return <LoginScreen onLogin={setLoggedUser} showToast={showToast} />;
  }

  return (
    <div className="pb-32 md:pb-10 flex min-h-screen">
      {toastMsg && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] animate-toast w-[90%] max-w-sm md:max-w-md">
          <div className={`glass-panel border px-5 py-3 rounded-2xl flex items-center gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${toastMsg.type === 'error' ? 'bg-red-900/90 border-red-500' : 'bg-[#0a0a0a]/95 border-[#e2ff00]'}`}>
            <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${toastMsg.type === 'error' ? 'bg-red-500 text-white' : 'bg-[#e2ff00] text-black'}`}>
              {toastMsg.type === 'error' ? '!' : <IconCheck />}
            </div>
            <p className="font-bold text-sm tracking-wide text-white leading-tight">{toastMsg.msg}</p>
          </div>
        </div>
      )}

      <nav className="fixed bottom-4 md:bottom-auto left-1/2 transform -translate-x-1/2 w-[96%] max-w-lg md:max-w-[85px] md:w-[85px] md:h-auto md:py-8 md:flex-col md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 glass-panel rounded-full md:rounded-[2.5rem] z-50 px-2 py-2 flex justify-around md:justify-center md:gap-6 items-center shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-[#333]/80 bg-[#111]/80 backdrop-blur-2xl">
        <NavButton icon={<IconHome />} label="Inicio" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <NavButton icon={<IconClipboard />} label="Pedidos" active={activeTab === 'pedidos'} onClick={() => setActiveTab('pedidos')} />
        <NavButton icon={<IconUsers />} label="Leads" active={activeTab === 'prospectos'} onClick={() => setActiveTab('prospectos')} />
        <NavButton icon={<IconPackage />} label="Stock" active={activeTab === 'inventario'} onClick={() => setActiveTab('inventario')} />
        <NavButton icon={<IconDollar />} label="Caja" active={activeTab === 'finanzas'} onClick={() => setActiveTab('finanzas')} />
        <NavButton icon={<IconFileText />} label="Cotizar" active={activeTab === 'presupuesto'} onClick={() => setActiveTab('presupuesto')} />
      </nav>

      <main className="pt-8 md:pt-10 px-4 md:px-5 max-w-lg md:max-w-5xl lg:max-w-7xl mx-auto w-full md:pl-[120px] transition-all duration-300">
        <header className="mb-8 animate-premium flex flex-col md:flex-row items-center md:items-end justify-between border-b border-[#333]/50 pb-6">
          <div className="flex flex-col items-center md:items-start">
            <img src={APP_LOGO_URL} alt="PolyfanTech" className="h-10 md:h-12 object-contain mb-1 drop-shadow-2xl opacity-90" />
            <h2 className="text-[#e2ff00] text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] mt-1 opacity-80 text-center md:text-left">Enterprise Management System</h2>
          </div>
          <div className="inline-flex items-center gap-2 glass-panel bg-[#111]/50 border border-[#333] px-5 py-2 rounded-full text-xs text-gray-400 mt-5 md:mt-0">
            <div className="w-2 h-2 rounded-full bg-[#e2ff00] shadow-[0_0_8px_#e2ff00] animate-pulse"></div>
            Operador: <strong className="text-white tracking-wide">{loggedUser}</strong>
          </div>
        </header>

        <div key={activeTab} className="animate-premium">
          {activeTab === 'dashboard' && <DashboardView finanzas={finanzas} pedidos={pedidos} inventario={inventario} prospectos={prospectos} setActiveTab={setActiveTab} />}
          {activeTab === 'pedidos' && <PedidosView pedidos={pedidos} inventario={inventario} loggedUser={loggedUser} showToast={showToast} pedidoToEdit={pedidoToEdit} setPedidoToEdit={setPedidoToEdit} />}
          {activeTab === 'prospectos' && <ProspectosView prospectos={prospectos} loggedUser={loggedUser} showToast={showToast} setActiveTab={setActiveTab} setPedidoToEdit={setPedidoToEdit} />}
          {activeTab === 'inventario' && <InventarioView inventario={inventario} showToast={showToast} />}
          {activeTab === 'finanzas' && <FinanzasView finanzas={finanzas} inventario={inventario} loggedUser={loggedUser} showToast={showToast} />}
          {activeTab === 'presupuesto' && <PresupuestoView showToast={showToast} loggedUser={loggedUser} />}
        </div>

        <div className="mt-20 flex flex-col items-center justify-center opacity-30 hover:opacity-100 transition-all duration-500 cursor-default pb-10">
          <p className="text-[8px] uppercase tracking-[0.4em] text-gray-500 mb-3 font-bold">Software de Gestión by</p>
          <img src={NOVABIT_LOGO_URL} alt="NovaBit Media Agency" className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110" />
        </div>
      </main>
    </div>
  );
}

// --- VISTAS DEL SISTEMA ---
function LoginScreen({ onLogin, showToast }) {
  const [selectedUser, setSelectedUser] = useState(''); 
  const [pass, setPass] = useState('');
  
  const handleIngresar = () => { 
    if (pass === PASS_ACCESO) { 
      onLogin(selectedUser); 
      showToast(`¡Sesión iniciada, ${selectedUser}!`); 
    } else { showToast('Credenciales denegadas', 'error'); } 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-sm md:max-w-md glass-panel border border-[#333] p-10 md:p-12 rounded-[2.5rem] shadow-2xl animate-pop relative overflow-hidden z-10 bg-[#0d0d0d]/80">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e2ff00] to-transparent opacity-80"></div>
        <img src={APP_LOGO_URL} alt="PolyfanTech" className="h-12 md:h-14 object-contain mx-auto mb-2 drop-shadow-md" />
        <h2 className="text-[#e2ff00] text-center text-[9px] font-black uppercase tracking-[0.4em] mb-10 opacity-80">Enterprise Management System</h2>
        
        {!selectedUser ? (
          <div className="space-y-4">
            <p className="text-center text-gray-500 uppercase text-xs font-bold tracking-widest mb-6">Seleccionar Perfil</p>
            <button onClick={() => setSelectedUser('Emanuel')} className="w-full glass-panel bg-black/60 border border-[#333] text-white font-black uppercase py-5 rounded-2xl hover:border-[#e2ff00] hover:text-[#e2ff00] transition-all">Emanuel</button>
            <button onClick={() => setSelectedUser('Gonzalo')} className="w-full glass-panel bg-black/60 border border-[#333] text-white font-black uppercase py-5 rounded-2xl hover:border-[#e2ff00] hover:text-[#e2ff00] transition-all">Gonzalo</button>
          </div>
        ) : (
          <div className="space-y-5 animate-premium">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">Hola, <span className="text-white text-sm">{selectedUser}</span></p>
              <button onClick={() => setSelectedUser('')} className="text-[9px] bg-[#222] px-3 py-1.5 rounded-full text-gray-400 uppercase font-bold hover:text-white transition-colors">Cambiar</button>
            </div>
            <div className="space-y-1 w-full">
              <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest ml-1">Clave de Acceso</label>
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" className="w-full glass-panel bg-black/50 border border-[#333] rounded-xl p-4 text-white focus:border-[#e2ff00] outline-none transition-all text-center tracking-[0.5em]" />
            </div>
            <button onClick={handleIngresar} className="w-full bg-[#e2ff00] text-black font-black uppercase py-4 rounded-xl mt-4 shadow-[0_0_25px_rgba(226,255,0,0.3)] hover:scale-105 transition-all">Desbloquear Sistema</button>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardView({ finanzas, pedidos, inventario, prospectos, setActiveTab }) {
  const safeFinanzas = finanzas || [];
  const safePedidos = pedidos || [];
  const safeInventario = inventario || [];
  const safeProspectos = prospectos || [];

  const ingresosHistoricos = useMemo(() => safeFinanzas.filter(f => f.tipo === 'Ingreso').reduce((a, b) => a + (Number(b.monto) || 0), 0), [safeFinanzas]);
  const gastosTotales = useMemo(() => safeFinanzas.filter(f => f.tipo === 'Gasto').reduce((a, b) => a + (Number(b.monto) || 0), 0), [safeFinanzas]);
  const gastosCaja = useMemo(() => safeFinanzas.filter(f => f.tipo === 'Gasto' && (!f.origen || f.origen === 'Caja Negocio')).reduce((a, b) => a + (Number(b.monto) || 0), 0), [safeFinanzas]);
  
  const balanceNeto = ingresosHistoricos - gastosTotales; 
  const cajaFisicaGlobal = ingresosHistoricos - gastosCaja; 
  
  const pedidosPendientes = safePedidos.filter(p => p.estado === 'Pendiente').length; 
  const pedidosProceso = safePedidos.filter(p => p.estado === 'En Proceso').length;
  const pedidosCompletados = safePedidos.filter(p => p.estado === 'Completado').length;
  const totalPedidos = safePedidos.length; 
  const progresoPedidos = totalPedidos > 0 ? Math.round((pedidosCompletados / totalPedidos) * 100) : 0;
  
  const entregasProximas = useMemo(() => {
    return safePedidos
      .filter(p => p.estado !== 'Completado' && p.fechaLimite)
      .sort((a, b) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime())
      .slice(0, 4); 
  }, [safePedidos]);
  
  const leadsActivos = safeProspectos.filter(p => p.estado !== 'Frío').length;
  const dineroPorCobrar = safePedidos.filter(p => p.estado !== 'Completado').reduce((a, b) => {
    const resto = (Number(b.precioTotal) || 0) - (Number(b.sena) || 0);
    return a + (resto > 0 ? resto : 0);
  }, 0);
  const stockCritico = safeInventario.filter(i => (Number(i.cantidad) || 0) <= (Number(i.minimoCritico) || 0));

  const generarListaComprasWhatsApp = () => {
    if (stockCritico.length === 0) return;
    const faltantes = stockCritico.map(i => `- ${i.nombre}: Quedan ${i.cantidad}${formatUnidad(i.unidad)}`).join('\n');
    const msj = `*LISTA DE COMPRAS - POLYFANTECH* 🛒\n\nHola! Necesitamos reponer urgentemente los siguientes insumos que llegaron a su límite:\n\n${faltantes}\n\nPor favor pasame presupuesto. ¡Gracias!`;
    window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(msj), "_blank");
  };

  const barChartData = {
    labels: ['Caja Histórica'],
    datasets: [
      { label: 'Ingresos Brutos', data: [ingresosHistoricos], backgroundColor: '#e2ff00', borderRadius: 4 },
      { label: 'Gastos Totales', data: [gastosTotales], backgroundColor: '#ef4444', borderRadius: 4 }
    ]
  };

  const pieChartData = {
    labels: ['Pendientes', 'En Proceso', 'Completados'],
    datasets: [{
      data: [pedidosPendientes, pedidosProceso, pedidosCompletados],
      backgroundColor: ['#eab308', '#3b82f6', '#22c55e'],
      borderWidth: 0, hoverOffset: 4
    }]
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#aaa', font: { size: 10 } } } }, scales: { y: { grid: { color: '#333' }, ticks: { color: '#888', font: { size: 10 } } }, x: { grid: { display: false }, ticks: { color: '#888', font: { size: 10 } } } } };
  const pieOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#aaa', font: { size: 10 } } } } };

  return (
    <div className="space-y-6 w-full">
      {stockCritico.length > 0 && (
        <div className="w-full bg-red-900/20 border-2 border-red-500/50 rounded-[2rem] p-5 md:p-6 shadow-[0_0_30px_rgba(239,68,68,0.15)] animate-pulse">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b border-red-500/20 pb-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-500 text-white p-2.5 rounded-full"><IconAlertTriangle /></div>
              <div>
                <h3 className="text-red-400 font-black uppercase tracking-widest text-xs md:text-sm">Alerta de Suministros Crítica</h3>
                <p className="text-gray-300 text-[10px] md:text-xs mt-1">Has alcanzado el umbral de alerta en {stockCritico.length} insumo(s).</p>
              </div>
            </div>
            <button onClick={generarListaComprasWhatsApp} className="w-full md:w-auto bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500 transition-colors shadow-lg">
              <IconWhatsApp /> Pedir a Proveedor
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-2">
            {stockCritico.map(item => (
              <div key={item.id} className="flex justify-between items-center text-xs border border-red-500/30 bg-[#0a0a0a]/50 p-3 rounded-xl">
                <span className="text-white font-bold truncate pr-2">{item.nombre}</span>
                <span className="text-red-400 font-black bg-red-500/10 px-2.5 py-1 rounded-md whitespace-nowrap">Stock: {item.cantidad}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-[65%] glass-panel border border-[#333] rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-center shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e2ff00] to-transparent"></div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 uppercase text-[10px] font-bold tracking-[0.2em] text-center md:text-left">Patrimonio Global (Balance Neto)</p>
            <div className="hidden md:flex items-center gap-1.5 bg-[#e2ff00]/10 border border-[#e2ff00]/20 px-3 py-1.5 rounded-full">
              <IconTrendingUp />
              <span className="text-[#e2ff00] text-[9px] uppercase tracking-widest font-bold">Estado Financiero</span>
            </div>
          </div>
          <h2 className={`text-5xl md:text-6xl font-black tracking-tighter text-center md:text-left ${balanceNeto >= 0 ? 'text-white' : 'text-red-500'}`}>
            ${balanceNeto.toLocaleString('es-AR')}
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-[#333]/50 gap-4">
            <div className="text-center md:text-left w-full md:w-auto">
              <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Total Ingresos</p>
              <p className="text-lg md:text-xl font-bold text-green-400">${ingresosHistoricos.toLocaleString('es-AR')}</p>
            </div>
            <div className="text-center bg-[#111] px-5 py-2.5 rounded-xl border border-[#222] w-full md:w-auto">
              <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Caja Física (Liquidez)</p>
              <p className={`text-lg md:text-xl font-bold ${cajaFisicaGlobal > 0 ? 'text-[#e2ff00]' : 'text-gray-500'}`}>${cajaFisicaGlobal.toLocaleString('es-AR')}</p>
            </div>
            <div className="text-center md:text-right w-full md:w-auto">
              <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Gastos Totales</p>
              <p className="text-lg md:text-xl font-bold text-red-400">${gastosTotales.toLocaleString('es-AR')}</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[35%] flex flex-col gap-6">
          <div className="glass-panel border border-[#333] rounded-[2rem] p-6 text-center shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1 flex justify-center items-center gap-1">
              <IconDollar /> Dinero en la calle (Por Cobrar)
            </p>
            <p className="text-2xl font-black text-[#e2ff00] drop-shadow-md">${dineroPorCobrar.toLocaleString('es-AR')}</p>
            <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-2">Corresponde a saldos de trabajos en proceso</p>
          </div>
          <div className="glass-panel border border-[#333] rounded-[2rem] p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Producción</h3>
              <span className="text-xl font-black text-[#e2ff00]">{progresoPedidos}%</span>
            </div>
            <div className="w-full bg-[#111] rounded-full h-2 mb-6 overflow-hidden border border-[#222]">
              <div className="bg-[#e2ff00] h-2 rounded-full shadow-[0_0_10px_#e2ff00]" style={{ width: `${progresoPedidos}%`, transition: 'width 1s ease-in-out' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-white">{pedidosPendientes + pedidosProceso}</p>
                <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">Trabajos Activos</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-[#e2ff00]">{leadsActivos}</p>
                <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">Leads Calientes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* RADAR DE ENTREGAS URGENTES */}
        <div className="w-full lg:w-1/3 glass-panel border border-[#333] rounded-[2rem] p-6 shadow-lg flex flex-col">
           <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
             <IconClock /> Radar de Entregas
           </h3>
           <div className="flex-1 space-y-3 overflow-y-auto pr-1">
             {entregasProximas.length > 0 ? entregasProximas.map(p => {
               const diasFaltantes = Math.ceil((new Date(p.fechaLimite).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
               const isUrgent = diasFaltantes <= 3;
               return (
                 <div key={p.id} className={`p-3 rounded-xl border ${isUrgent ? 'bg-red-900/10 border-red-500/30' : 'bg-[#0a0a0a] border-[#222]'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-white font-bold text-xs truncate max-w-[70%]">{p.cliente}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${isUrgent ? 'bg-red-500 text-white' : 'bg-[#222] text-gray-400'}`}>
                        {diasFaltantes < 0 ? 'Vencido' : diasFaltantes === 0 ? '¡HOY!' : `${diasFaltantes} días`}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 truncate">{p.detalle}</p>
                 </div>
               );
             }) : (
               <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#222] rounded-xl">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">No hay fechas límite<br/>próximas registradas.</p>
               </div>
             )}
           </div>
           <button onClick={() => setActiveTab('pedidos')} className="mt-4 w-full bg-[#111] hover:bg-[#222] border border-[#333] text-gray-400 text-[9px] uppercase font-bold py-2.5 rounded-lg transition-colors">
             Ver Todos los Pedidos
           </button>
        </div>
        <div className="w-full lg:w-1/3 glass-panel border border-[#333] rounded-[2rem] p-6 shadow-lg">
           <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">Métricas Financieras</h3>
           <ChartCanvas type="bar" data={barChartData} options={chartOptions} height={200} />
        </div>
        <div className="w-full lg:w-1/3 glass-panel border border-[#333] rounded-[2rem] p-6 shadow-lg">
           <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">Status de Proyectos</h3>
           <ChartCanvas type="doughnut" data={pieChartData} options={pieOptions} height={200} />
        </div>
      </div>
    </div>
  );
}

function FinanzasView({ finanzas, inventario, loggedUser, showToast }) {
  const [tipo, setTipo] = useState('Ingreso'); 
  const [monto, setMonto] = useState(''); 
  const [concepto, setConcepto] = useState(''); 
  const [origen, setOrigen] = useState('Caja Negocio'); 
  const [gastoCategoria, setGastoCategoria] = useState('Otros');
  const [idInsumo, setIdInsumo] = useState('');
  const [cantidadInsumo, setCantidadInsumo] = useState('');
  const [editId, setEditId] = useState(null);
  const [filtroCaja, setFiltroCaja] = useState('Todos');

  const limpiarForm = () => { 
      setMonto(''); setConcepto(''); setOrigen('Caja Negocio'); 
      setGastoCategoria('Otros'); setIdInsumo(''); setCantidadInsumo('');
      setEditId(null); setTipo('Ingreso'); 
  };
  
  const guardarMovimiento = () => {
    if (!monto || !concepto) return showToast('Faltan datos', 'error');
    
    const data = { 
        tipo, 
        monto: Number(monto) || 0, 
        concepto, 
        origen: (tipo === 'Ingreso' ? 'Caja Negocio' : origen), 
        registradoPor: loggedUser,
        categoriaGasto: tipo === 'Gasto' ? gastoCategoria : null,
        idInsumo: tipo === 'Gasto' && gastoCategoria === 'Insumo' ? idInsumo : null,
        cantidadInsumo: tipo === 'Gasto' && gastoCategoria === 'Insumo' ? (Number(cantidadInsumo) || 0) : null
    };

    if (tipo === 'Gasto' && gastoCategoria === 'Insumo' && idInsumo && cantidadInsumo && !editId) {
        const itemRef = db.collection('inventario').doc(idInsumo);
        itemRef.get().then(doc => {
            if(doc.exists) {
                const actual = Number(doc.data().cantidad) || 0;
                itemRef.update({ cantidad: actual + Number(cantidadInsumo) });
            }
        });
    }

    if (editId) {
        db.collection('finanzas').doc(editId).update(data).then(() => { showToast('Actualizado'); limpiarForm(); });
    } else {
        db.collection('finanzas').add({ ...data, fecha: new Date().toISOString() }).then(() => { showToast('Guardado'); limpiarForm(); });
    }
  };

  const eliminarMov = (id) => db.collection('finanzas').doc(id).delete().then(() => showToast('Eliminado', 'success'));
  
  const cargarParaEditar = (f) => { 
      setTipo(f.tipo || 'Ingreso'); 
      setMonto(f.monto || ''); 
      setConcepto(f.concepto || ''); 
      setOrigen(f.origen || 'Caja Negocio'); 
      setGastoCategoria(f.categoriaGasto || 'Otros'); 
      setIdInsumo(f.idInsumo || ''); 
      setCantidadInsumo(f.cantidadInsumo || '');
      setEditId(f.id); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };
  
  const exportarCSV = () => {
    let csv = "Fecha,Tipo,Categoria,Origen/Destino,Concepto,Monto ($),Operador\n";
    safeFinanzas.forEach(f => { 
      csv += `"${f.fecha ? new Date(f.fecha).toLocaleDateString() : 'Sin Fecha'}","${f.tipo || ''}","${f.categoriaGasto || ''}","${f.origen || 'Caja Negocio'}","${f.concepto || ''}","${f.monto || 0}","${f.registradoPor || ''}"\n`; 
    });
    const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })); link.download = `Reporte_Caja.csv`; link.click();
  };

  const safeFinanzas = finanzas || [];
  const safeInventario = inventario || []; // PROTECCIÓN ANTI CRASH

  // FECHA DE CORTE Y MATEMATICA RECIENTE BLINDADA
  const FECHA_CORTE = new Date(2026, 8, 17, 14, 0, 0).getTime(); // 17 Sep 2026
  let cajaFisicaGlobal = 0, deudaE = 0, deudaG = 0, fondoTaller = 0;
  let gastosInsumosNuevo = 0, gastosMaquinariaNuevo = 0, gastosOtrosNuevo = 0;

  const listOrdenada = [...safeFinanzas].sort((a,b) => {
      const tA = a.fecha ? new Date(a.fecha).getTime() : 0;
      const tB = b.fecha ? new Date(b.fecha).getTime() : 0;
      return tA - tB;
  });
  
  listOrdenada.forEach(f => {
      const isNew = f.fecha ? new Date(f.fecha).getTime() >= FECHA_CORTE : false;
      const m = Number(f.monto) || 0;

      if (f.tipo === 'Ingreso') {
          cajaFisicaGlobal += m;
          if (isNew) {
              let disp = m;
              if (deudaE > 0 || deudaG > 0) {
                  let mitad = disp / 2; let pE = Math.min(deudaE, mitad); let pG = Math.min(deudaG, mitad);
                  deudaE -= pE; deudaG -= pG; disp -= (pE + pG);
                  if (disp > 0) {
                      if (deudaE > 0) { let ex = Math.min(deudaE, disp); deudaE -= ex; disp -= ex; }
                      if (deudaG > 0) { let ex = Math.min(deudaG, disp); deudaG -= ex; disp -= ex; }
                  }
              }
              if (disp > 0) fondoTaller += disp * 0.40;
          }
      } else {
          if (isNew && f.categoriaGasto === 'Insumo') gastosInsumosNuevo += m;
          if (isNew && f.categoriaGasto === 'Maquinaria') gastosMaquinariaNuevo += m;
          if (isNew && (!f.categoriaGasto || f.categoriaGasto === 'Otros')) gastosOtrosNuevo += m;

          if (f.origen === 'Caja Negocio' || !f.origen) {
              cajaFisicaGlobal -= m;
              if (isNew) fondoTaller -= m;
          } else if (f.origen === 'Emanuel') {
              if (isNew) deudaE += m;
          } else if (f.origen === 'Gonzalo') {
              if (isNew) deudaG += m;
          }
      }
  });

  // SIMULADOR EN TIEMPO REAL
  let simMonto = Number(monto) || 0;
  let simDeudaE = 0, simDeudaG = 0, simFondo = 0, simDivE = 0, simDivG = 0;

  if (tipo === 'Ingreso' && simMonto > 0) {
      let tDeudaE = deudaE; let tDeudaG = deudaG;
      let disp = simMonto;

      if (tDeudaE > 0 || tDeudaG > 0) {
          let mitad = disp / 2;
          let pE = Math.min(tDeudaE, mitad); let pG = Math.min(tDeudaG, mitad);
          simDeudaE += pE; simDeudaG += pG;
          tDeudaE -= pE; tDeudaG -= pG; disp -= (pE + pG);
          if (disp > 0) {
              if (tDeudaE > 0) { let ex = Math.min(tDeudaE, disp); simDeudaE += ex; disp -= ex; }
              if (tDeudaG > 0) { let ex = Math.min(tDeudaG, disp); simDeudaG += ex; disp -= ex; }
          }
      }
      if (disp > 0) { simFondo = disp * 0.40; simDivE = disp * 0.30; simDivG = disp * 0.30; }
  }

  // APLICAR FILTRO AL HISTORIAL
  const listInversa = [...listOrdenada].reverse().filter(f => {
     if(filtroCaja === 'Ingresos') return f.tipo === 'Ingreso';
     if(filtroCaja === 'Gastos') return f.tipo === 'Gasto';
     return true;
  });

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-[45%] lg:w-[40%] space-y-6 flex-shrink-0 md:sticky md:top-10">
        <div className="glass-panel border border-[#333] p-6 md:p-8 rounded-[2rem] space-y-5">
          <h2 className="text-[#e2ff00] text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-center">Control de Caja</h2>
          <div className="flex p-1.5 bg-[#0a0a0a] rounded-2xl border border-[#222]">
            <button onClick={() => {setTipo('Ingreso'); setOrigen('Caja Negocio');}} className={`flex-1 py-3 md:py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${tipo === 'Ingreso' ? 'bg-[#1a2e1a] text-green-400 border border-green-900/50' : 'text-gray-600 hover:text-gray-400'}`}>Ingreso</button>
            <button onClick={() => setTipo('Gasto')} className={`flex-1 py-3 md:py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${tipo === 'Gasto' ? 'bg-[#2e1a1a] text-red-400 border border-red-900/50' : 'text-gray-600 hover:text-gray-400'}`}>Gasto</button>
          </div>
          <Input type="number" label="Monto Real ($)" value={monto} onChange={setMonto} />
          
          {tipo === 'Ingreso' && simMonto > 0 && (
            <div className="bg-[#111] p-4 rounded-xl border border-green-900/50 animate-premium">
              <p className="text-[9px] text-[#e2ff00] uppercase font-black tracking-widest mb-3 flex items-center gap-1"><IconWallet /> Distribución Sugerida de este Ingreso</p>
              <div className="space-y-2">
                {simDeudaE > 0 && <div className="flex justify-between text-xs"><span className="text-gray-400">Pagar Deuda Emanuel:</span> <span className="text-white">${simDeudaE.toLocaleString('es-AR')}</span></div>}
                {simDeudaG > 0 && <div className="flex justify-between text-xs"><span className="text-gray-400">Pagar Deuda Gonzalo:</span> <span className="text-white">${simDeudaG.toLocaleString('es-AR')}</span></div>}
                <div className="flex justify-between text-xs pt-2 border-t border-[#222]"><span className="text-gray-400 font-bold uppercase tracking-wider">Guardar en Taller (40%):</span> <span className="text-[#e2ff00] font-bold">${simFondo.toLocaleString('es-AR')}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase tracking-wider">Bolsillo Emanuel (30%):</span> <span className="text-blue-400 font-bold">${simDivE.toLocaleString('es-AR')}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase tracking-wider">Bolsillo Gonzalo (30%):</span> <span className="text-green-400 font-bold">${simDivG.toLocaleString('es-AR')}</span></div>
              </div>
            </div>
          )}

          {tipo === 'Gasto' && (
            <div className="w-full space-y-4">
              <div className="space-y-1.5 w-full">
                <label className="text-[9px] text-[#e2ff00] uppercase font-bold tracking-widest ml-1">¿Qué tipo de gasto es?</label>
                <select value={gastoCategoria} onChange={e => setGastoCategoria(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-4 text-sm text-white outline-none">
                  <option value="Otros">Gasto General / Otros</option>
                  <option value="Insumo">Compra de Insumos (Stock)</option>
                  <option value="Maquinaria">Herramientas / Maquinaria</option>
                </select>
              </div>

              {gastoCategoria === 'Insumo' && (
                <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#333] animate-premium">
                   <label className="text-[9px] text-gray-400 uppercase font-bold tracking-widest ml-1">¿Qué insumo ingresa al taller?</label>
                   <div className="flex gap-2 mt-2">
                       <select value={idInsumo} onChange={e => setIdInsumo(e.target.value)} className="flex-1 glass-panel bg-[#111] border border-[#333] rounded-lg p-2 text-[10px] text-white outline-none focus:border-[#e2ff00]">
                           <option value="">Seleccionar del catálogo...</option>
                           {safeInventario.map(inv => <option key={inv.id} value={inv.id}>{inv.nombre} ({inv.cantidad} disp.)</option>)}
                       </select>
                       <input type="number" value={cantidadInsumo} onChange={e => setCantidadInsumo(e.target.value)} placeholder="Cant." className="w-20 glass-panel bg-[#111] border border-[#333] rounded-lg p-2 text-[10px] text-white outline-none text-center" />
                   </div>
                   <p className="text-[8px] text-gray-500 mt-2">Se sumará automáticamente esta cantidad a las existencias del inventario al guardar.</p>
                </div>
              )}

              <div className="space-y-1.5 w-full">
                <label className="text-[9px] text-[#e2ff00] uppercase font-bold tracking-widest ml-1">¿De dónde salió el dinero?</label>
                <select value={origen} onChange={e => setOrigen(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-4 text-sm text-white outline-none">
                  <option value="Caja Negocio">Caja Fuerte (Dinero del Taller)</option>
                  <option value="Emanuel">Inversión de Emanuel (Bolsillo)</option>
                  <option value="Gonzalo">Inversión de Gonzalo (Bolsillo)</option>
                </select>
              </div>
            </div>
          )}

          <Input label="Concepto / Observaciones" value={concepto} onChange={setConcepto} />
          
          <div className="flex gap-3 pt-2">
            {editId && <button onClick={limpiarForm} className="w-1/3 bg-[#111] border border-[#333] text-gray-400 font-black uppercase text-[10px] tracking-widest py-4 rounded-xl hover:bg-[#222]">Cancelar</button>}
            <button onClick={guardarMovimiento} className={`${editId ? 'w-2/3 bg-[#e2ff00] text-black' : 'w-full bg-white text-black hover:bg-gray-200'} font-black uppercase tracking-wider py-4 rounded-xl mt-2 hover:scale-[1.02] transition-all`}>
              {editId ? 'Actualizar Registro' : 'Registrar en Caja'}
            </button>
          </div>
        </div>

        <div className="glass-panel border border-[#333] rounded-[2rem] p-6 shadow-lg bg-[#111]">
          <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">Estado del Negocio (Nuevo Ciclo)</h3>
          <div className="space-y-3 mb-6">
            <div className="bg-[#0a0a0a] border border-[#222] p-3 rounded-xl flex justify-between"><span className="text-xs font-bold text-gray-300">Deuda c/ Emanuel</span><span className="font-black text-white">${deudaE.toLocaleString('es-AR')}</span></div>
            <div className="bg-[#0a0a0a] border border-[#222] p-3 rounded-xl flex justify-between"><span className="text-xs font-bold text-gray-300">Deuda c/ Gonzalo</span><span className="font-black text-white">${deudaG.toLocaleString('es-AR')}</span></div>
          </div>
          <div className="border-t border-[#222] pt-4">
            <span className="text-[10px] text-[#e2ff00] uppercase font-black tracking-widest mb-2 flex items-center gap-1"><IconWallet /> Caja Exclusiva del Taller (Fondo)</span>
            <span className="text-3xl font-black text-[#e2ff00] block mb-2">${fondoTaller.toLocaleString('es-AR')}</span>
            <p className="text-[8px] text-gray-500 uppercase tracking-widest leading-relaxed mt-2">Este fondo acumula el 40% de los nuevos ingresos y se descuenta al registrar Gastos pagados con la "Caja Fuerte".</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[55%] lg:w-[60%] space-y-4">
        {/* PREMIUM: Radar Financiero de Egresos */}
        <div className="flex gap-2 w-full mb-6">
           <div className="flex-1 bg-[#111] border border-[#333] p-4 rounded-2xl text-center">
              <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Inv. Insumos</span>
              <span className="text-xl font-black text-blue-400">${gastosInsumosNuevo.toLocaleString('es-AR')}</span>
           </div>
           <div className="flex-1 bg-[#111] border border-[#333] p-4 rounded-2xl text-center">
              <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Inv. Herramientas</span>
              <span className="text-xl font-black text-purple-400">${gastosMaquinariaNuevo.toLocaleString('es-AR')}</span>
           </div>
           <div className="flex-1 bg-[#111] border border-[#333] p-4 rounded-2xl text-center">
              <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Gastos Grales</span>
              <span className="text-xl font-black text-red-400">${gastosOtrosNuevo.toLocaleString('es-AR')}</span>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 pl-2 pr-1 border-b border-[#333]/50 pb-4 gap-3">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Historial de Transacciones</h3>
          <div className="flex items-center gap-2">
            <div className="flex bg-[#111] border border-[#333] rounded-full p-1">
               <button onClick={() => setFiltroCaja('Todos')} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-colors ${filtroCaja === 'Todos' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-gray-300'}`}>Todos</button>
               <button onClick={() => setFiltroCaja('Ingresos')} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-colors ${filtroCaja === 'Ingresos' ? 'bg-green-900/40 text-green-400' : 'text-gray-500 hover:text-gray-300'}`}>Ingresos</button>
               <button onClick={() => setFiltroCaja('Gastos')} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-colors ${filtroCaja === 'Gastos' ? 'bg-red-900/40 text-red-400' : 'text-gray-500 hover:text-gray-300'}`}>Gastos</button>
            </div>
            <button onClick={exportarCSV} className="text-[9px] uppercase tracking-widest font-bold text-[#e2ff00] bg-[#e2ff00]/10 px-4 py-2 rounded-full border border-[#e2ff00]/20 hover:bg-[#e2ff00]/20 transition-colors">Excel</button>
          </div>
        </div>

        <div className="space-y-3">
          {listInversa.map((f, i) => (
            <div key={f.id} className={`glass-panel p-5 rounded-2xl flex justify-between items-center border transition-all animate-stagger ${editId === f.id ? 'border-[#e2ff00] bg-[#e2ff00]/5' : 'border-[#333] hover:border-[#555]'}`} style={{animationDelay: `${i * 0.04}s`}}>
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-white text-base leading-tight">{f.concepto}</p>
                  {f.tipo === 'Gasto' && f.categoriaGasto && (
                    <span className="text-[8px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded uppercase font-bold border border-purple-500/20">{f.categoriaGasto}</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500">{f.fecha ? new Date(f.fecha).toLocaleDateString() : 'Sin Fecha'}</span>
                  <span className="text-[9px] uppercase tracking-widest text-gray-600 border-l border-[#444] pl-2">Ref: {f.registradoPor}</span>
                  {f.tipo === 'Gasto' && f.origen && f.origen !== 'Caja Negocio' && (
                    <span className="text-[8px] bg-[#e2ff00]/20 text-[#e2ff00] border border-[#e2ff00]/30 px-2 py-0.5 rounded uppercase font-bold tracking-widest ml-1">Pagó: {f.origen}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <span className={`font-black text-xl whitespace-nowrap ${f.tipo === 'Ingreso' ? 'text-green-400' : 'text-red-400'}`}>
                  {f.tipo === 'Ingreso' ? '+' : '-'}${Number(f.monto).toLocaleString('es-AR')}
                </span>
                <div className="flex flex-col gap-1.5 border-l border-[#333] pl-3 md:pl-4">
                  {deleteId === f.id ? (
                    <div className="flex flex-col gap-1">
                      <button onClick={() => eliminarMov(f.id)} className="bg-red-600 text-white font-bold text-[9px] px-2 py-1.5 rounded hover:bg-red-500 transition-colors">Borrar</button>
                      <button onClick={() => setDeleteId(null)} className="bg-[#222] text-gray-400 font-bold text-[9px] px-2 py-1.5 rounded hover:bg-[#333] transition-colors">X</button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <button onClick={() => cargarParaEditar(f)} className="text-gray-400 hover:text-[#e2ff00] transition-colors p-1"><IconEdit /></button>
                      <button onClick={() => setDeleteId(f.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><IconTrash /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {listInversa.length === 0 && (
            <div className="text-center p-10 border-2 border-dashed border-[#333] rounded-[2rem]">
              <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">No hay transacciones.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PedidosView({ pedidos, inventario, loggedUser, showToast, pedidoToEdit, setPedidoToEdit }) {
  const [showForm, setShowForm] = useState(false); 
  const [filtro, setFiltro] = useState('Pendiente'); 
  const [busqueda, setBusqueda] = useState(''); 
  const [cliente, setCliente] = useState(''); 
  const [detalle, setDetalle] = useState(''); 
  const [prioridad, setPrioridad] = useState('Media'); 
  const [urlArchivo, setUrlArchivo] = useState(''); 
  const [celular, setCelular] = useState(''); 
  const [precioTotal, setPrecioTotal] = useState(''); 
  const [sena, setSena] = useState(''); 
  const [fechaLimite, setFechaLimite] = useState(''); 
  const [insumosUsados, setInsumosUsados] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null); 
  const [generandoRemito, setGenerandoRemito] = useState(false);

  useEffect(() => {
    if (pedidoToEdit && db) {
       const p = (pedidos || []).find(x => x.id === pedidoToEdit);
       if (p) cargarParaEditar(p);
       setPedidoToEdit(null);
    }
  }, [pedidoToEdit, pedidos]);

  const limpiarForm = () => { 
    setCliente(''); setDetalle(''); setPrioridad('Media'); 
    setUrlArchivo(''); setCelular(''); setPrecioTotal(''); 
    setSena(''); setFechaLimite(''); setInsumosUsados([]);
    setEditId(null); setShowForm(false); 
  };

  const addInsumo = () => setInsumosUsados([...insumosUsados, { idInsumo: '', cantidad: '' }]);
  const updateInsumo = (index, field, val) => {
      const arr = [...insumosUsados];
      arr[index][field] = val;
      setInsumosUsados(arr);
  };
  const removeInsumo = (index) => setInsumosUsados(insumosUsados.filter((_, i) => i !== index));

  const procesarDescuentoInventario = () => {
      insumosUsados.forEach(ins => {
          if (ins.idInsumo && Number(ins.cantidad) > 0) {
             const itemRef = db.collection('inventario').doc(ins.idInsumo);
             itemRef.get().then(doc => {
                 if (doc.exists) {
                     const currentCant = Number(doc.data().cantidad) || 0;
                     const nuevaCant = currentCant - Number(ins.cantidad);
                     itemRef.update({ cantidad: nuevaCant });
                 }
             });
          }
      });
  };

  const guardarPedido = () => {
    if (!cliente || !detalle) return showToast('Faltan datos del cliente', 'error');
    // Inicializamos el checklist premium para trazabilidad
    const baseChecklist = { corte: false, lija: false, pintura: false, armado: false };
    
    const data = { 
      cliente, detalle, prioridad, urlArchivo, celular, 
      precioTotal: Number(precioTotal) || 0, sena: Number(sena) || 0, 
      fechaLimite: fechaLimite || null 
    };
    
    if (editId) {
      db.collection('pedidos').doc(editId).update(data)
        .then(() => { procesarDescuentoInventario(); showToast('Pedido actualizado y stock descontado'); limpiarForm(); })
    } else {
      db.collection('pedidos').add({ ...data, estado: 'Pendiente', checklist: baseChecklist, fecha: new Date().toISOString(), registradoPor: loggedUser })
        .then(() => { procesarDescuentoInventario(); showToast('Pedido cargado y stock descontado'); limpiarForm(); })
    }
  };

  const actualizarEstado = (id, estadoActual) => {
    const estados = ['Pendiente', 'En Proceso', 'Completado']; 
    const nextEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length];
    db.collection('pedidos').doc(id).update({ estado: nextEstado }).then(() => showToast(`Movido a: ${nextEstado}`));
  };

  // FUNCIÓN PREMIUM: Toggle Checklist
  const toggleChecklist = (id, currentChecklist, taskField) => {
    const updated = { ...currentChecklist, [taskField]: !currentChecklist[taskField] };
    db.collection('pedidos').doc(id).update({ checklist: updated });
  };

  const eliminarPedido = (id) => db.collection('pedidos').doc(id).delete().then(() => { showToast('Pedido eliminado'); setDeleteId(null); });

  const cargarParaEditar = (p) => { 
    setCliente(p.cliente); setDetalle(p.detalle); setPrioridad(p.prioridad || 'Media'); 
    setUrlArchivo(p.urlArchivo || ''); setCelular(p.celular || ''); 
    setPrecioTotal(p.precioTotal || ''); setSena(p.sena || ''); 
    setFechaLimite(p.fechaLimite || ''); setInsumosUsados([]); 
    setEditId(p.id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const enviarWhatsApp = (p) => {
    const resto = (Number(p.precioTotal) || 0) - (Number(p.sena) || 0);
    let texto = `Hola *${p.cliente}*! 👋 Somos PolyfanTech.\n\nTe avisamos que tu trabajo (${p.detalle}) está: *${p.estado}*.\n`;
    if(resto > 0) texto += `\n*Saldo pendiente al entregar:* $${resto.toLocaleString('es-AR')}\n`;
    texto += `\nCualquier consulta avisanos!`;
    window.open("https://api.whatsapp.com/send?" + (p.celular ? "phone=" + p.celular + "&" : "") + "text=" + encodeURIComponent(texto), "_blank");
  };

  // FUNCIÓN PREMIUM: Exportador de Remito de Garantía
  const exportarRemitoGarantia = (p) => {
     setGenerandoRemito(true);
     const resto = (Number(p.precioTotal) || 0) - (Number(p.sena) || 0);
     setTimeout(() => {
        let htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 40px; color: #111; width: 600px; background-color: #ffffff; box-sizing: border-box; margin: 0; position: relative; border: 4px solid #111;">
          <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px dashed #ccc; padding-bottom: 20px;">
            <img src="${TICKET_LOGO_URL}?t=${new Date().getTime()}" crossorigin="anonymous" style="max-height: 70px; margin-bottom: 10px;" />
            <h2 style="margin: 0; font-size: 22px; color: #000; text-transform: uppercase; font-weight: 900; letter-spacing: 2px;">REMITO DE ENTREGA & GARANTÍA</h2>
          </div>
          
          <div style="margin-bottom: 25px;">
             <p style="margin: 5px 0; font-size: 15px;"><strong>Cliente:</strong> ${p.cliente}</p>
             <p style="margin: 5px 0; font-size: 15px;"><strong>Fecha de Entrega:</strong> ${new Date().toLocaleDateString()}</p>
             <p style="margin: 5px 0; font-size: 15px;"><strong>Detalle del Trabajo:</strong> ${p.detalle}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 25px; border: 1px solid #eee;">
             <h3 style="margin: 0 0 10px 0; font-size: 16px; text-transform: uppercase;">Resumen de Saldos</h3>
             <p style="margin: 5px 0; font-size: 14px;">Total Presupuestado: $${Number(p.precioTotal).toLocaleString('es-AR')}</p>
             <p style="margin: 5px 0; font-size: 14px;">Seña Abonada: $${Number(p.sena).toLocaleString('es-AR')}</p>
             <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: bold; color: ${resto > 0 ? '#d32f2f' : '#388e3c'}; border-top: 1px solid #ccc; padding-top: 10px;">
                Saldo a Pagar al Retirar: $${resto.toLocaleString('es-AR')}
             </p>
          </div>

          <div style="background-color: #111; color: #fff; padding: 25px; border-radius: 15px;">
             <h3 style="margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; color: #e2ff00; letter-spacing: 1px;">Recomendaciones de Cuidado</h3>
             <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8;">
                <li><strong>Limpieza:</strong> Utilizar únicamente un paño seco o levemente húmedo con agua.</li>
                <li><strong>Prohibido:</strong> NO utilizar solventes, alcohol, thinner ni productos abrasivos sobre el material pintado.</li>
                <li><strong>Temperatura:</strong> Si su cartel es de interior, evitar la exposición directa y prolongada a fuentes de calor intenso o luz solar directa tras un vidrio.</li>
                <li><strong>Instalación Eléctrica:</strong> Ante cualquier anomalía con la fuente de alimentación, desconectar inmediatamente y contactarnos.</li>
             </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 12px; color: #444; font-weight: bold; margin: 0;">¡Gracias por confiar en PolyfanTech!</p>
            <p style="font-size: 11px; color: #888; margin-top: 5px;">Recreo - Catamarca</p>
          </div>
        </div>
        `;
        const element = document.createElement('div'); element.innerHTML = htmlContent; 
        element.style.position = 'absolute'; element.style.top = '0px'; element.style.left = '0px'; element.style.zIndex = '99990'; 
        document.body.appendChild(element);
        
        window.html2canvas(element, { scale: 2, useCORS: true, allowTaint: true, windowWidth: 600, backgroundColor: '#ffffff' }).then(canvas => {
          const link = document.createElement('a'); link.download = `RemitoGarantia_${p.cliente.replace(/\s+/g, '')}.png`; link.href = canvas.toDataURL('image/png'); link.click();
          setGenerandoRemito(false); document.body.removeChild(element); showToast('¡Remito de Garantía Descargado!');
        });
     }, 600);
  };

  const safePedidos = pedidos || [];
  const safeInventario = inventario || []; 

  const pedidosFiltrados = safePedidos
    .filter(p => p.estado === filtro)
    .filter(p => (p.cliente || '').toLowerCase().includes(busqueda.toLowerCase()) || (p.detalle || '').toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-start">
      {generandoRemito && (
        <div className="fixed inset-0 z-[99999] bg-[#050505]/95 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#333] border-t-[#e2ff00] rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(226,255,0,0.2)]"></div>
          <h2 className="text-[#e2ff00] text-sm font-black uppercase tracking-[0.3em]">Generando Remito y Garantía...</h2>
        </div>
      )}

      <div className="w-full md:w-[40%] lg:w-[35%] space-y-5 flex-shrink-0 md:sticky md:top-10">
        <button onClick={() => { if(showForm) limpiarForm(); else setShowForm(true); }} className="w-full bg-[#e2ff00] text-black font-black uppercase py-4 rounded-[1.25rem] flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(226,255,0,0.15)] hover:scale-[1.02] transition-transform">
          {showForm ? 'Cerrar Panel' : <><IconPlus /> Cargar Nuevo Trabajo</>}
        </button>
        
        {showForm && (
          <div className={`glass-panel border p-6 rounded-[2rem] space-y-4 animate-premium transition-colors duration-300 ${editId ? 'border-[#e2ff00]' : 'border-[#333]'}`}>
            {editId && <div className="text-[#e2ff00] text-[10px] font-black uppercase tracking-widest text-center bg-[#e2ff00]/10 py-2 rounded-lg mb-2">Modificando Pedido</div>}
            
            <Input label="Cliente" value={cliente} onChange={setCliente} />
            <div className="grid grid-cols-2 gap-3">
              <Input type="number" label="WhatsApp" value={celular} onChange={setCelular} />
              <Input type="date" label="Fecha Límite" value={fechaLimite} onChange={setFechaLimite} />
            </div>
            <Input label="Link de Diseño" value={urlArchivo} onChange={setUrlArchivo} />
            <div className="grid grid-cols-2 gap-3">
              <Input type="number" label="Total ($)" value={precioTotal} onChange={setPrecioTotal} />
              <Input type="number" label="Seña ($)" value={sena} onChange={setSena} />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] text-gray-400 uppercase font-bold tracking-widest ml-1">Prioridad</label>
              <select value={prioridad} onChange={e => setPrioridad(e.target.value)} className="w-full glass-panel bg-[#0a0a0a]/80 border border-[#333] rounded-xl p-4 text-white outline-none focus:border-[#e2ff00] appearance-none">
                <option value="Baja">Baja</option><option value="Media">Media</option><option value="Alta">Alta 🔥</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-gray-400 uppercase font-bold tracking-widest ml-1">Detalle del Trabajo</label>
              <textarea className="w-full glass-panel bg-[#0a0a0a]/80 border border-[#333] rounded-xl p-4 text-white outline-none focus:border-[#e2ff00] transition-all" rows="2" value={detalle} onChange={e => setDetalle(e.target.value)}></textarea>
            </div>

            <div className="bg-[#111] p-4 rounded-xl border border-[#333] mt-2">
              <div className="flex justify-between items-center mb-3">
                 <label className="text-[9px] text-[#e2ff00] uppercase font-black tracking-widest flex items-center gap-1"><IconPackage /> Consumo de Material</label>
              </div>
              <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-3">Selecciona los insumos a usar. Se descontarán automáticamente del stock al guardar.</p>
              {insumosUsados.map((ins, i) => (
                  <div key={i} className="flex gap-2 items-center mb-2">
                      <select value={ins.idInsumo} onChange={e => updateInsumo(i, 'idInsumo', e.target.value)} className="flex-1 glass-panel bg-[#0a0a0a] border border-[#333] rounded-lg p-2 text-[10px] text-white outline-none focus:border-[#e2ff00]">
                          <option value="">Seleccionar Material...</option>
                          {safeInventario.map(inv => <option key={inv.id} value={inv.id}>{inv.nombre} ({inv.cantidad} disp.)</option>)}
                      </select>
                      <input type="number" value={ins.cantidad} onChange={e => updateInsumo(i, 'cantidad', e.target.value)} placeholder="Cant." className="w-16 glass-panel bg-[#0a0a0a] border border-[#333] rounded-lg p-2 text-[10px] text-white outline-none text-center" />
                      <button onClick={() => removeInsumo(i)} className="w-7 h-7 bg-red-900/30 text-red-500 rounded flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">X</button>
                  </div>
              ))}
              <button onClick={addInsumo} className="w-full bg-[#0a0a0a] border border-dashed border-[#444] text-gray-400 text-[9px] font-bold uppercase py-2 rounded-lg hover:border-[#e2ff00] hover:text-[#e2ff00] transition-colors mt-1">+ Descontar Insumo del Stock</button>
            </div>
            
            <div className="flex gap-3 pt-2">
              {editId && <button onClick={limpiarForm} className="w-1/3 bg-[#111] border border-[#333] text-gray-400 font-black uppercase text-[10px] tracking-widest py-4 rounded-xl hover:bg-[#222] transition-colors">Cancelar</button>}
              <button onClick={guardarPedido} className={`${editId ? 'w-2/3 bg-[#e2ff00] text-black shadow-[0_0_15px_rgba(226,255,0,0.2)]' : 'w-full bg-white text-black'} font-bold uppercase py-4 rounded-xl mt-2 hover:scale-[1.02] transition-all`}>
                {editId ? 'Actualizar Pedido' : 'Guardar e Iniciar Trabajo'}
              </button>
            </div>
          </div>
        )}
        <input type="text" placeholder="Buscar por cliente o trabajo..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full glass-panel bg-[#111]/80 border border-[#333] rounded-2xl py-3.5 text-sm text-white focus:border-[#e2ff00] outline-none transition-all search-input" />
        <div className="flex flex-col bg-[#111] p-1.5 rounded-2xl border border-[#333] gap-1">
          {['Pendiente', 'En Proceso', 'Completado'].map(f => (
            <button key={f} onClick={() => setFiltro(f)} className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filtro === f ? 'bg-[#2a2a2a] text-white shadow-md border border-[#444]' : 'text-gray-500 hover:text-gray-300'}`}>{f}</button>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-[60%] lg:w-[65%] space-y-4">
        {pedidosFiltrados.map((p, i) => {
          const resto = (Number(p.precioTotal) || 0) - (Number(p.sena) || 0);
          const chk = p.checklist || { corte: false, lija: false, pintura: false, armado: false };
          
          return (
            <div key={p.id} className={`glass-panel p-5 md:p-6 rounded-3xl border transition-all animate-stagger md:flex md:flex-col md:gap-2 ${p.prioridad === 'Alta' ? 'border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.15)] bg-red-900/10' : p.prioridad === 'Media' ? 'border-yellow-500/60 shadow-[0_0_15px_rgba(234,179,8,0.1)] bg-yellow-900/10' : 'border-[#333] hover:border-[#444]'}`} style={{animationDelay: `${i * 0.05}s`}}>
              <div className="flex justify-between items-start mb-3 md:mb-0">
                <div>
                  <h3 className="font-black text-xl md:text-2xl text-white flex items-center gap-2">{p.cliente}</h3>
                  <div className="flex flex-wrap gap-2 items-center mt-2">
                    <span className={`text-[8px] px-2.5 py-0.5 rounded-full uppercase tracking-widest font-black border ${p.prioridad === 'Alta' ? 'bg-red-500/20 text-red-400 border-red-500/40' : p.prioridad === 'Media' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{p.prioridad}</span>
                    {p.fechaLimite && <span className="flex items-center gap-1 text-[9px] text-[#e2ff00] font-bold uppercase tracking-widest bg-[#e2ff00]/10 px-2 py-0.5 rounded-full border border-[#e2ff00]/20"><IconClock /> Entrega: {new Date(p.fechaLimite + 'T00:00:00').toLocaleDateString()}</span>}
                  </div>
                </div>
                <div className="flex gap-1.5 md:gap-2">
                  {deleteId === p.id ? (
                    <div className="flex gap-1 items-center bg-[#111] border border-[#222] p-1.5 rounded-lg">
                      <button onClick={() => eliminarPedido(p.id)} className="bg-red-600 text-white font-bold text-[10px] px-3 py-1.5 rounded hover:bg-red-500 transition-colors">Confirmar</button>
                      <button onClick={() => setDeleteId(null)} className="bg-[#222] text-gray-400 font-bold text-[10px] px-3 py-1.5 rounded hover:bg-[#333] transition-colors">X</button>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => cargarParaEditar(p)} className="text-gray-400 hover:text-[#e2ff00] bg-[#0a0a0a]/50 border border-[#222] p-2.5 rounded-full transition-colors"><IconEdit /></button>
                      <button onClick={() => setDeleteId(p.id)} className="text-gray-400 hover:text-red-500 bg-[#0a0a0a]/50 border border-[#222] p-2.5 rounded-full transition-colors"><IconTrash /></button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-300 my-4 bg-[#0a0a0a]/50 p-4 rounded-xl border border-[#222]/50 leading-relaxed">{p.detalle}</p>
              
              {/* FUNCION PREMIUM: Checklist Trazabilidad Taller (Sólo En Proceso) */}
              {p.estado === 'En Proceso' && (
                 <div className="mb-4 bg-[#050505]/80 border border-[#333] p-4 rounded-xl">
                    <p className="text-[9px] text-[#e2ff00] uppercase font-black tracking-widest mb-3 flex items-center gap-1"><IconCheck /> Trazabilidad de Taller</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                       <button onClick={() => toggleChecklist(p.id, chk, 'corte')} className={`text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg border transition-all ${chk.corte ? 'bg-[#e2ff00] text-black border-[#e2ff00]' : 'bg-[#111] text-gray-500 border-[#333] hover:border-gray-500'}`}>Corte CNC</button>
                       <button onClick={() => toggleChecklist(p.id, chk, 'lija')} className={`text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg border transition-all ${chk.lija ? 'bg-[#e2ff00] text-black border-[#e2ff00]' : 'bg-[#111] text-gray-500 border-[#333] hover:border-gray-500'}`}>Masilla/Lija</button>
                       <button onClick={() => toggleChecklist(p.id, chk, 'pintura')} className={`text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg border transition-all ${chk.pintura ? 'bg-[#e2ff00] text-black border-[#e2ff00]' : 'bg-[#111] text-gray-500 border-[#333] hover:border-gray-500'}`}>Pintura</button>
                       <button onClick={() => toggleChecklist(p.id, chk, 'armado')} className={`text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg border transition-all ${chk.armado ? 'bg-[#e2ff00] text-black border-[#e2ff00]' : 'bg-[#111] text-gray-500 border-[#333] hover:border-gray-500'}`}>Armado/LED</button>
                    </div>
                 </div>
              )}

              {(Number(p.precioTotal) > 0 || Number(p.sena) > 0) && (
                <div className="flex justify-between items-center bg-[#0a0a0a]/80 border border-[#333] p-3 rounded-xl mb-4 text-xs">
                  <div><span className="text-gray-500">Total:</span> <strong className="text-white">${Number(p.precioTotal).toLocaleString('es-AR')}</strong></div>
                  <div><span className="text-gray-500">Seña:</span> <strong className="text-green-400">${Number(p.sena).toLocaleString('es-AR')}</strong></div>
                  <div><span className="text-gray-500">Saldo:</span> <strong className="text-[#e2ff00]">${resto.toLocaleString('es-AR')}</strong></div>
                </div>
              )}
              <div className="md:flex md:justify-between md:items-center w-full">
                <div className="mb-4 md:mb-0 flex gap-3">
                  {p.urlArchivo && <a href={p.urlArchivo} target="_blank" rel="noreferrer" className="text-[10px] md:text-xs text-[#e2ff00] underline break-all hover:text-white transition-colors">Abrir Archivo</a>}
                </div>
                
                {/* FUNCION PREMIUM: Si está completado, muestra generador de Garantía */}
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  {p.estado === 'Completado' && (
                     <button onClick={() => exportarRemitoGarantia(p)} className="flex-1 md:flex-none md:w-48 bg-[#111] text-white text-[9px] uppercase font-bold py-3.5 rounded-xl border border-[#444] flex items-center justify-center gap-2 hover:bg-[#222] transition-colors"><IconShield /> Exportar Remito/Garantía</button>
                  )}
                  {p.estado !== 'Completado' && (
                     <button onClick={() => enviarWhatsApp(p)} className="flex-1 md:flex-none md:w-32 bg-[#1a2e1a] text-green-400 text-[10px] uppercase font-bold py-3.5 rounded-xl border border-green-900/30 flex items-center justify-center gap-2 hover:bg-[#203a20] transition-colors"><IconWhatsApp /> Chat</button>
                  )}
                  <button onClick={() => actualizarEstado(p.id, p.estado)} className="flex-1 md:flex-none md:w-40 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold py-3.5 rounded-xl border border-[#333] hover:bg-[#222] transition-colors">Avanzar Etapa</button>
                </div>
              </div>
            </div>
          );
        })}
        {pedidosFiltrados.length === 0 && (
          <div className="text-center p-10 border-2 border-dashed border-[#333] rounded-[2rem]">
            <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">No hay registros en esta etapa.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProspectosView({ prospectos, loggedUser, showToast, setActiveTab, setPedidoToEdit }) {
  const [showForm, setShowForm] = useState(false); 
  const [filtro, setFiltro] = useState('Todos'); 
  const [busqueda, setBusqueda] = useState(''); 
  const [nombre, setNombre] = useState(''); 
  const [interes, setInteres] = useState(''); 
  const [estado, setEstado] = useState('Esperando Portfolio'); 
  const [celular, setCelular] = useState(''); 
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null); 

  const limpiarForm = () => { setNombre(''); setInteres(''); setEstado('Esperando Portfolio'); setCelular(''); setEditId(null); setShowForm(false); };

  const guardarProspecto = () => {
    if (!nombre || !interes) return showToast('Faltan datos', 'error');
    const data = { nombre, interes, estado, celular, registradoPor: loggedUser };
    if (editId) db.collection('prospectos').doc(editId).update(data).then(() => { showToast('Actualizado'); limpiarForm(); })
    else db.collection('prospectos').add({...data, fecha: new Date().toISOString()}).then(() => { showToast('Guardado'); limpiarForm(); })
  };

  const eliminarProspecto = (id) => db.collection('prospectos').doc(id).delete().then(()=> { showToast('Eliminado'); setDeleteId(null); });
  const cargarParaEditar = (p) => { setNombre(p.nombre); setInteres(p.interes); setEstado(p.estado); setCelular(p.celular || ''); setEditId(p.id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  
  const convertirAPedido = (p) => {
    if (window.confirm('¿El cliente confirmó? Esto lo moverá a Pedidos y abrirá su formulario para completar detalles.')) {
      db.collection('pedidos').add({ 
        cliente: p.nombre, detalle: p.interes, prioridad: 'Media', urlArchivo: '', celular: p.celular || '', 
        precioTotal: 0, sena: 0, estado: 'Pendiente', checklist: { corte: false, lija: false, pintura: false, armado: false }, fecha: new Date().toISOString(), registradoPor: loggedUser 
      }).then((docRef) => { 
        db.collection('prospectos').doc(p.id).delete(); 
        showToast('¡Venta Cerrada!', 'success'); 
        setPedidoToEdit(docRef.id);
        setActiveTab('pedidos'); 
      });
    }
  };

  const safeProspectos = prospectos || [];
  let prospectosFiltrados = safeProspectos.filter(p => (p.nombre || '').toLowerCase().includes(busqueda.toLowerCase()) || (p.interes || '').toLowerCase().includes(busqueda.toLowerCase())).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  if (filtro !== 'Todos') prospectosFiltrados = prospectosFiltrados.filter(p => p.estado === filtro);

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-[40%] lg:w-[35%] space-y-5 flex-shrink-0 md:sticky md:top-10">
        <button onClick={() => { if(showForm) limpiarForm(); else setShowForm(true); }} className="w-full bg-[#e2ff00] text-black font-black uppercase py-4 rounded-[1.25rem] flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(226,255,0,0.15)] hover:scale-[1.02] transition-transform">
          {showForm ? 'Cerrar Panel' : <><IconUsers /> Nuevo Prospecto</>}
        </button>
        {showForm && (
          <div className={`glass-panel border p-6 rounded-[2rem] space-y-4 animate-premium transition-colors duration-300 ${editId ? 'border-[#e2ff00]' : 'border-[#333]'}`}>
            <Input label="Nombre o Empresa" value={nombre} onChange={setNombre} />
            <Input type="number" label="WhatsApp" value={celular} onChange={setCelular} />
            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest ml-1">Estado de la Venta</label>
              <select value={estado} onChange={e => setEstado(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-4 text-white outline-none focus:border-[#e2ff00] appearance-none">
                <option value="Caliente">🔥 Muy interesado</option><option value="Esperando Portfolio">👀 Esperando ver fotos</option><option value="Frío">❄️ Frío / Pausado</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest ml-1">¿Qué busca?</label>
              <textarea className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-4 text-white outline-none focus:border-[#e2ff00] transition-all" rows="2" value={interes} onChange={e => setInteres(e.target.value)}></textarea>
            </div>
            <div className="flex gap-3 pt-2">
              {editId && <button onClick={limpiarForm} className="w-1/3 bg-[#111] border border-[#333] text-gray-400 font-black uppercase py-4 rounded-xl hover:bg-[#222]">Cancelar</button>}
              <button onClick={guardarProspecto} className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl mt-2 hover:scale-[1.02] transition-all">Guardar Lead</button>
            </div>
          </div>
        )}
        <input type="text" placeholder="Buscar prospectos..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full glass-panel bg-[#111]/80 border border-[#333] rounded-2xl py-3.5 text-sm text-white focus:border-[#e2ff00] outline-none transition-all search-input" />
        <div className="flex flex-col bg-[#111] p-1.5 rounded-2xl border border-[#333] gap-1">
          {['Todos', 'Caliente', 'Esperando Portfolio', 'Frío'].map(f => (
            <button key={f} onClick={() => setFiltro(f)} className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filtro === f ? 'bg-[#2a2a2a] text-white shadow-md border border-[#444]' : 'text-gray-500 hover:text-gray-300'}`}>{f}</button>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-[60%] lg:w-[65%] grid grid-cols-1 lg:grid-cols-2 gap-4">
        {prospectosFiltrados.map((p, i) => (
          <div key={p.id} className={`glass-panel p-5 md:p-6 rounded-3xl border transition-all animate-stagger flex flex-col justify-between ${p.estado === 'Caliente' ? 'border-red-500/50 bg-red-900/10' : p.estado === 'Esperando Portfolio' ? 'border-yellow-500/50 bg-yellow-900/10' : 'border-[#333] opacity-70 hover:opacity-100'}`} style={{animationDelay: `${i * 0.05}s`}}>
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-xl text-white">{p.nombre}</h3>
                <div className="flex gap-1.5">
                  <button onClick={() => cargarParaEditar(p)} className="text-gray-400 hover:text-[#e2ff00] p-1.5"><IconEdit /></button>
                  <button onClick={() => eliminarProspecto(p.id)} className="text-gray-400 hover:text-red-500 p-1.5"><IconTrash /></button>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4 mt-2 bg-[#0a0a0a]/50 p-3 rounded-xl border border-[#222]/50">{p.interes}</p>
            </div>
            <div className="flex gap-2 mt-auto">
              <button onClick={() => window.open("https://api.whatsapp.com/send?" + (p.celular ? "phone=" + p.celular + "&" : "") + "text=" + encodeURIComponent("Hola! Te comparto nuestro portfolio..."), "_blank")} className="flex-1 bg-[#1a2e1a] text-green-400 text-[9px] uppercase font-bold py-3 rounded-xl border border-green-900/30 flex items-center justify-center gap-1 hover:bg-[#203a20] transition-colors"><IconWhatsApp /> Enviar Portfolio</button>
              <button onClick={() => convertirAPedido(p)} className="flex-1 bg-[#e2ff00]/10 text-[#e2ff00] text-[9px] uppercase font-black py-3 rounded-xl border border-[#e2ff00]/30 hover:bg-[#e2ff00]/20 transition-colors">Venta Cerrada</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventarioView({ inventario, showToast }) {
  const [showForm, setShowForm] = useState(false); 
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [nombre, setNombre] = useState(''); 
  const [cantidad, setCantidad] = useState(''); 
  const [costoUnitario, setCostoUnitario] = useState(''); 
  const [categoria, setCategoria] = useState('Planchas Polyfan'); 
  const [unidad, setUnidad] = useState('Unidades'); 
  const [minimoCritico, setMinimoCritico] = useState('2'); 
  const [editId, setEditId] = useState(null);

  const limpiarForm = () => { setNombre(''); setCantidad(''); setCostoUnitario(''); setCategoria('Planchas Polyfan'); setUnidad('Unidades'); setMinimoCritico('2'); setEditId(null); setShowForm(false); };
  
  const guardarItem = () => {
    if (!nombre || !cantidad) return showToast('Completá los datos', 'error');
    const data = { nombre, categoria, unidad, cantidad: Number(cantidad), costoUnitario: Number(costoUnitario) || 0, minimoCritico: Number(minimoCritico) };
    if (editId) db.collection('inventario').doc(editId).update(data).then(() => { showToast('Actualizado'); limpiarForm(); });
    else db.collection('inventario').add(data).then(() => { showToast('Agregado'); limpiarForm(); });
  };

  const eliminarItem = (id) => db.collection('inventario').doc(id).delete().then(()=> showToast('Eliminado'));
  const cargarParaEditar = (item) => { setNombre(item.nombre); setCantidad(item.cantidad); setCostoUnitario(item.costoUnitario || ''); setCategoria(item.categoria || 'Planchas Polyfan'); setUnidad(item.unidad || 'Unidades'); setMinimoCritico(item.minimoCritico || '2'); setEditId(item.id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const actualizarCantidad = (id, actual, delta) => { const n = (Number(actual) + delta).toFixed(2); if (n >= 0) db.collection('inventario').doc(id).update({ cantidad: Number(n) }); };
  
  const safeInventario = inventario || [];
  let inventarioFiltrado = safeInventario.filter(i => (i.nombre || '').toLowerCase().includes(busqueda.toLowerCase()));
  if (categoriaFiltro !== 'Todas') inventarioFiltrado = inventarioFiltrado.filter(i => i.categoria === categoriaFiltro);
  
  const categoriasUnicas = ['Todas', ...new Set(safeInventario.map(i => i.categoria || 'General'))];
  const valorTotalInventario = safeInventario.reduce((sum, item) => sum + (Number(item.cantidad) * Number(item.costoUnitario || 0)), 0);

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-[40%] lg:w-[35%] space-y-5 flex-shrink-0 md:sticky md:top-10">
        <div className="glass-panel bg-[#111]/80 border border-[#333] rounded-[1.5rem] p-5 text-center shadow-lg">
            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-1">Valor Patrimonial del Stock</span><br/>
            <span className="text-3xl font-black text-[#e2ff00]">${valorTotalInventario.toLocaleString('es-AR')}</span>
        </div>
        <button onClick={() => { if(showForm) limpiarForm(); else setShowForm(true); }} className="w-full glass-panel border border-[#333] text-white font-black uppercase py-4 rounded-[1.25rem] flex justify-center items-center gap-2 hover:bg-[#111] shadow-lg">
          {showForm ? 'Cerrar Gestor' : <><IconPlus /> Administrar Insumo</>}
        </button>
        {showForm && (
          <div className="glass-panel border border-[#e2ff00] p-6 rounded-[2rem] space-y-4">
            <Input label="Nombre del Insumo" value={nombre} onChange={setNombre} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 w-full"><label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest ml-1">Categoría</label><select value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full glass-panel bg-[#0a0a0a]/80 border border-[#333] rounded-xl p-4 text-white outline-none"><option>Planchas Polyfan</option><option>Pinturas / Aerosoles</option><option>Pegamentos / Siliconas</option><option>Electrónica / LED</option><option>Insumos 3D</option><option>Varios</option></select></div>
              <div className="space-y-1 w-full"><label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest ml-1">Medida</label><select value={unidad} onChange={e => setUnidad(e.target.value)} className="w-full glass-panel bg-[#0a0a0a]/80 border border-[#333] rounded-xl p-4 text-white outline-none"><option>Unidades</option><option>Metros</option><option>Litros</option><option>Gramos</option></select></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Input type="number" label="Cant. Real" value={cantidad} onChange={setCantidad} />
              <Input type="number" label="Alerta Min." value={minimoCritico} onChange={setMinimoCritico} />
              <Input type="number" label="Costo U. ($)" value={costoUnitario} onChange={setCostoUnitario} />
            </div>
            <button onClick={guardarItem} className="w-full bg-[#e2ff00] text-black font-black uppercase tracking-wider py-4 rounded-xl mt-2">Guardar Insumo</button>
          </div>
        )}
        <input type="text" placeholder="Buscar material..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full glass-panel bg-[#111]/80 border border-[#333] rounded-2xl py-3.5 px-4 text-sm text-white outline-none" />
        <div className="flex flex-wrap gap-2">
           {categoriasUnicas.map(cat => <button key={cat} onClick={() => setCategoriaFiltro(cat)} className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${categoriaFiltro === cat ? 'bg-[#e2ff00] text-black' : 'bg-[#111] text-gray-400 border border-[#333] hover:text-white'}`}>{cat}</button>)}
        </div>
      </div>

      <div className="w-full md:w-[60%] lg:w-[65%] grid grid-cols-1 lg:grid-cols-2 gap-4">
        {inventarioFiltrado.map((item, i) => (
          <div key={item.id} className={`glass-panel p-5 rounded-2xl flex flex-col justify-between ${Number(item.cantidad) <= (Number(item.minimoCritico) || 0) ? 'border-red-500/50 bg-red-900/10' : 'border-[#333]'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="pr-2"><p className="font-bold text-lg text-white leading-tight">{item.nombre}</p><p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mt-1">{item.categoria}</p></div>
              <div className="flex gap-1.5 items-center">
                <button onClick={() => cargarParaEditar(item)} className="text-gray-500 hover:text-[#e2ff00] p-1.5"><IconEdit /></button>
                <button onClick={() => eliminarItem(item.id)} className="text-gray-500 hover:text-red-500 p-1.5"><IconTrash /></button>
              </div>
            </div>
            {Number(item.costoUnitario) > 0 && (
                <div className="mb-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-[#222] pb-2">
                    Costo U: <span className="text-white">${item.costoUnitario}</span> | Total: <span className="text-[#e2ff00]">${(item.costoUnitario * item.cantidad).toLocaleString('es-AR')}</span>
                </div>
            )}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1 bg-[#0a0a0a] p-1 rounded-xl border border-[#222]">
                <button onClick={() => actualizarCantidad(item.id, item.cantidad, -1)} className="w-8 h-8 font-bold text-xl text-gray-500 hover:text-white">-</button>
                <span className="text-xl font-black min-w-[3.5rem] text-center text-[#e2ff00]">{item.cantidad}</span>
                <button onClick={() => actualizarCantidad(item.id, item.cantidad, 1)} className="w-8 h-8 font-bold text-xl text-gray-500 hover:text-white">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PresupuestoView({ showToast, loggedUser }) {
  const [modoCotizador, setModoCotizador] = useState('Rapido');
  const URL_BACKEND_GAS = "https://script.google.com/macros/s/AKfycbxE0G3BsraiT0du0BHvvF8U38YUXiMSD8Ta-LAMQG3VgRlCluvMwTfJvtei23hmiRmT/exec"; 
  
  const COSTOS_EXPRESS = { gananciaPorPlaca: 10000, costoPlacaNeto: { '20mm': 13500, '30mm': 28000, '40mm': 37300, '50mm': 46200, 'Ninguno': 0 }, valorHora: 6500, precioMetroLed: 4500, precioFuente: 18000, costoSoporte3D: 1200, instalacionBasica: 25000, instalacionAltura: 55000 };
  const COSTOS_BETA = { gananciaPorPlaca: 15000, costoPlacaNeto: { '20mm': 13000, '30mm': 20100, '40mm': 26900, '50mm': 32300 }, precioViniloM2: 55000, fijoPintura: 10000, fijoLuzMaquinas: 40000, fijoManoDeObra: 35000, fijoPegamento: 10000, adicionalExterior: 30000, precioMetroLed: 8900, precioMetroCable: 4000, fijoSoportes3D: 25000, fijoFuenteLuz: 50000, instalacionNormal: 30000, instalacionAltura: 50000 };
  const AREA_PLACA = 0.72;

  // ESTADOS EXPRESS
  const [crAncho, setCrAncho] = useState(''); const [crAlto, setCrAlto] = useState(''); const [crDensidad, setCrDensidad] = useState('40'); const [crComplejidad, setCrComplejidad] = useState('3'); const [crExterior, setCrExterior] = useState('No'); const [crLeds, setCrLeds] = useState('No'); const [crInstalacion, setCrInstalacion] = useState('Sin colocación'); const [crEspesorFrente, setCrEspesorFrente] = useState('20mm'); const [crEspesorFondo, setCrEspesorFondo] = useState('Ninguno'); const [precioAjustado, setPrecioAjustado] = useState(0); const [descargandoExpress, setDescargandoExpress] = useState(false);

  const m2Totales = (Number(crAncho) * Number(crAlto)) || 0; 
  let placasEstimadasFrente = m2Totales > 0 ? Math.ceil((m2Totales * (crDensidad === '100' ? 1 : crDensidad === '65' ? 1.4 : 1.8)) / AREA_PLACA) : 0;
  let costoPlacasRapido = placasEstimadasFrente * (COSTOS_EXPRESS.costoPlacaNeto[crEspesorFrente] + COSTOS_EXPRESS.gananciaPorPlaca);
  if (m2Totales > 0 && crEspesorFondo !== 'Ninguno') { costoPlacasRapido += Math.ceil((m2Totales * 1.2) / AREA_PLACA) * (COSTOS_EXPRESS.costoPlacaNeto[crEspesorFondo] + COSTOS_EXPRESS.gananciaPorPlaca); }
  
  let horasEstimadas = m2Totales * Number(crComplejidad) + (crExterior === 'Si' ? m2Totales * 1.5 : 0) + (crLeds === 'Si' ? m2Totales * 3 : 0) + (crEspesorFondo !== 'Ninguno' ? m2Totales * 1.5 : 0);
  let subtotalRapido = costoPlacasRapido + (horasEstimadas * COSTOS_EXPRESS.valorHora) + (costoPlacasRapido * (crExterior === 'Si' ? 0.6 : 0.3)) + (crLeds === 'Si' ? (((Number(crAncho) + Number(crAlto)) * 3 * COSTOS_EXPRESS.precioMetroLed) + COSTOS_EXPRESS.precioFuente + (Math.ceil(m2Totales * 12) * COSTOS_EXPRESS.costoSoporte3D)) : 0) + (crInstalacion === 'Instalación Básica' ? COSTOS_EXPRESS.instalacionBasica : crInstalacion === 'Compleja / Altura' ? COSTOS_EXPRESS.instalacionAltura : 0);
  
  useEffect(() => { setPrecioAjustado(subtotalRapido * 2); }, [subtotalRapido]);

  // ESTADOS BETA AI
  const [betaCliente, setBetaCliente] = useState(''); const [betaTrabajo, setBetaTrabajo] = useState(''); const [betaAncho, setBetaAncho] = useState(''); const [betaAlto, setBetaAlto] = useState(''); const [betaPlacas, setBetaPlacas] = useState([{ id: Date.now(), espesor: '30mm', cantidad: '' }]); const [betaVinilo, setBetaVinilo] = useState('No'); const [betaExterior, setBetaExterior] = useState('No'); const [betaLuz, setBetaLuz] = useState('No'); const [betaMetrosLed, setBetaMetrosLed] = useState(''); const [betaMetrosCable, setBetaMetrosCable] = useState(''); const [betaInstalacion, setBetaInstalacion] = useState('Normal'); const [betaTiempo, setBetaTiempo] = useState('10 a 15 días hábiles'); const [betaPagos, setBetaPagos] = useState('50% anticipo, 50% al finalizar'); const [betaPrecioAjustado, setBetaPrecioAjustado] = useState(0); const [betaRespuestaIA, setBetaRespuestaIA] = useState(''); const [generandoIA, setGenerandoIA] = useState(false); const [descargandoBeta, setDescargandoBeta] = useState(false);

  useEffect(() => {
     let cPlacas = betaPlacas.reduce((acc, p) => acc + (Number(p.cantidad) > 0 ? Number(p.cantidad) * (COSTOS_BETA.costoPlacaNeto[p.espesor] + COSTOS_BETA.gananciaPorPlaca) : 0), 0);
     let subB = cPlacas + COSTOS_BETA.fijoPintura + COSTOS_BETA.fijoLuzMaquinas + COSTOS_BETA.fijoManoDeObra + COSTOS_BETA.fijoPegamento + (betaVinilo === 'Si' ? ((Number(betaAncho)*Number(betaAlto)) * COSTOS_BETA.precioViniloM2) : 0) + (betaExterior === 'Si' ? COSTOS_BETA.adicionalExterior : 0) + (betaLuz === 'Si' ? (Number(betaMetrosLed) * COSTOS_BETA.precioMetroLed) + (Number(betaMetrosCable) * COSTOS_BETA.precioMetroCable) + COSTOS_BETA.fijoSoportes3D + COSTOS_BETA.fijoFuenteLuz : 0) + (betaInstalacion === 'Altura' ? COSTOS_BETA.instalacionAltura : betaInstalacion === 'Normal' ? COSTOS_BETA.instalacionNormal : 0);
     setBetaPrecioAjustado(subB);
  }, [betaPlacas, betaAncho, betaAlto, betaVinilo, betaExterior, betaLuz, betaMetrosLed, betaMetrosCable, betaInstalacion]);

  const handleAddBetaPlaca = () => setBetaPlacas([...betaPlacas, { id: Date.now(), espesor: '20mm', cantidad: '' }]);
  const handleRemoveBetaPlaca = (id) => setBetaPlacas(betaPlacas.filter(p => p.id !== id));
  const handleUpdateBetaPlaca = (id, field, value) => setBetaPlacas(betaPlacas.map(p => p.id === id ? { ...p, [field]: value } : p));

  const generarPropuestaIA = () => {
     const placasValidas = betaPlacas.filter(p => Number(p.cantidad) > 0);
     if(!betaCliente || !betaTrabajo || placasValidas.length === 0 || !betaAncho || !betaAlto) {
         return showToast("Completá cliente, trabajo, medidas y al menos 1 placa", "error");
     }
     
     setGenerandoIA(true);
     const detallePlacasIA = placasValidas.map(p => p.cantidad + " placa/s de Polyfan de " + p.espesor).join(' + ');
     
     const promptText = "Cliente: " + betaCliente + "\n" +
     "Trabajo: " + betaTrabajo + "\n" +
     "Medidas: " + betaAncho + "m (ancho) x " + betaAlto + "m (alto).\n" +
     "Material corpóreo: " + detallePlacasIA + ".\n" +
     "Preparación para exterior: " + betaExterior + ".\n" +
     "Lleva Vinilo impreso de alta calidad: " + betaVinilo + ".\n" +
     "Iluminación LED: " + betaLuz + (betaLuz === 'Si' ? " (SÍ LLEVA: Incluye " + betaMetrosLed + "m de tira LED, " + betaMetrosCable + "m de cable cristal, soportes 3D y fuente)" : " (NO LLEVA LUZ)") + ".\n" +
     "Nivel de Instalación: " + betaInstalacion + ".";

     fetch(URL_BACKEND_GAS, {
       method: "POST",
       headers: { "Content-Type": "text/plain;charset=utf-8" },
       body: JSON.stringify({ action: "redactarPropuestaIA", promptText: promptText })
     })
     .then(res => res.json())
     .then(data => {
       if(data.success) { setBetaRespuestaIA(data.text); showToast("Propuesta generada"); }
       else { showToast("Error IA: " + data.error, "error"); }
       setGenerandoIA(false);
     }).catch(err => { showToast("Error Red: " + err, "error"); setGenerandoIA(false); });
  };

  const exportarTicketBeta = () => {
    if(!betaRespuestaIA) return showToast("Generá la propuesta primero", "error");
    setDescargandoBeta(true);
    setTimeout(() => {
      let htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 40px; color: #111; width: 500px; background-color: #ffffff; box-sizing: border-box; margin: 0; display: block; position: relative;">
          <div style="text-align: center; margin-bottom: 25px;">
            <img src="${TICKET_LOGO_URL}?t=${new Date().getTime()}" crossorigin="anonymous" style="max-height: 60px; margin-bottom: 10px;" />
            <h2 style="margin: 0; font-size: 18px; color: #000; text-transform: uppercase; font-weight: 900;">PROPUESTA DE PROYECTO</h2>
          </div>
          <div style="font-size: 13px; line-height: 1.6; color: #222;">${betaRespuestaIA}</div>
          <div style="border-top: 2px dashed #ddd; margin: 20px 0;"></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px;">
            <span style="color: #666;">Tiempo de entrega:</span><span style="font-weight: bold; text-align: right;">${betaTiempo}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px;">
            <span style="color: #666;">Formas de pago:</span><span style="font-weight: bold; text-align: right;">${betaPagos}</span>
          </div>
          <div style="background: #000; color: #fff; padding: 25px; border-radius: 15px; margin: 25px 0; text-align: center;">
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #e2ff00;">PRECIO FINAL</p>
            <p style="margin: 10px 0 0 0; font-size: 42px; font-weight: 900;">$${Number(betaPrecioAjustado).toLocaleString('es-AR')}</p>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 10px; color: #aaa; margin: 0 0 4px 0;">Sujeto a cambios según diseño y detalles finales</p>
            <p style="font-size: 11px; color: #666; font-weight: bold; margin: 0;">Polyfan Tech | Corpóreos y Diseños | Recreo - Catamarca</p>
          </div>
        </div>
      `;
      const element = document.createElement('div'); element.innerHTML = htmlContent; 
      element.style.position = 'absolute'; element.style.top = '0px'; element.style.left = '0px'; element.style.zIndex = '99990'; 
      document.body.appendChild(element);
      const posPrevia = window.scrollY; window.scrollTo(0, 0);
      
      window.html2canvas(element, { scale: 2, useCORS: true, allowTaint: true, scrollY: 0, windowWidth: 500, backgroundColor: '#ffffff' }).then(canvas => {
        const link = document.createElement('a'); link.download = `Propuesta_${betaCliente.replace(/\s+/g, '_')}.png`; 
        link.href = canvas.toDataURL('image/png'); link.click();
        setDescargandoBeta(false); window.scrollTo(0, posPrevia); document.body.removeChild(element); showToast('¡Imagen descargada!');
      });
    }, 800);
  };

  const guardarComoLead = () => {
    if(!betaCliente || !betaTrabajo) return showToast("Faltan datos del cliente/trabajo", "error");
    db.collection('prospectos').add({
      nombre: betaCliente,
      interes: `Propuesta IA generada: ${betaTrabajo} (${betaAncho}x${betaAlto}m). Precio estimado: $${betaPrecioAjustado}`,
      estado: 'Caliente',
      celular: '',
      fecha: new Date().toISOString(),
      registradoPor: loggedUser || 'Sistema IA'
    }).then(() => {
      showToast('¡Lead guardado en el sistema!', 'success');
    }).catch(() => showToast('Error al guardar', 'error'));
  };

  return (
    <div className="space-y-6 w-full">
      {descargandoExpress && (
        <div className="fixed inset-0 z-[99999] bg-[#050505]/95 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#333] border-t-[#e2ff00] rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(226,255,0,0.2)]"></div>
          <h2 className="text-[#e2ff00] text-sm font-black uppercase tracking-[0.3em]">Generando Exportación Express</h2>
        </div>
      )}
      {descargandoBeta && (
        <div className="fixed inset-0 z-[99999] bg-[#050505]/95 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#333] border-t-purple-500 rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(147,51,234,0.2)]"></div>
          <h2 className="text-purple-400 text-sm font-black uppercase tracking-[0.3em]">Exportando Propuesta Beta</h2>
        </div>
      )}
      {generandoIA && (
        <div className="fixed inset-0 z-[99999] bg-[#050505]/95 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#333] border-t-purple-500 rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(147,51,234,0.2)]"></div>
          <h2 className="text-purple-400 text-sm font-black uppercase tracking-[0.3em]">IA Analizando y Redactando...</h2>
        </div>
      )}

      <div className="flex bg-[#111] p-1.5 rounded-2xl border border-[#333] shadow-lg flex-col md:flex-row md:w-3/4 md:mx-auto gap-1">
        <button onClick={() => setModoCotizador('Rapido')} className={`flex-1 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex justify-center items-center gap-2 ${modoCotizador === 'Rapido' ? 'bg-[#e2ff00] text-black shadow-[0_0_15px_rgba(226,255,0,0.2)]' : 'text-gray-500 hover:text-white'}`}>
          <IconZap /> Express 3.0
        </button>
        <button onClick={() => setModoCotizador('Beta')} className={`flex-1 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex justify-center items-center gap-2 ${modoCotizador === 'Beta' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]' : 'text-gray-500 hover:text-white'}`}>
          <IconSparkles /> Experimental Beta (IA)
        </button>
      </div>

      {modoCotizador === 'Rapido' && (
        <div className="w-full flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2 glass-panel border border-[#333] p-6 rounded-[2rem] space-y-6 animate-premium">
            <div className="text-center md:text-left">
              <h3 className="text-white font-black text-lg uppercase tracking-widest">Calculadora Rápida</h3>
              <p className="text-[10px] text-[#e2ff00] uppercase tracking-widest mt-1">Cálculo Proporcional y Capas Múltiples</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" label="Ancho (Metros)" value={crAncho} onChange={setCrAncho} placeholder="Ej: 1.70" />
              <Input type="number" label="Alto (Metros)" value={crAlto} onChange={setCrAlto} placeholder="Ej: 1.50" />
            </div>
            
            <div className="space-y-4 bg-[#0a0a0a]/50 p-5 rounded-2xl border border-[#222]">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="space-y-1 w-full">
                  <label className="text-[9px] text-[#e2ff00] uppercase font-bold tracking-widest ml-1">Capa Frente (Letras)</label>
                  <select value={crEspesorFrente} onChange={e => setCrEspesorFrente(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none focus:border-[#e2ff00] appearance-none">
                    <option value="20mm">Polyfan 20mm</option><option value="30mm">Polyfan 30mm</option>
                    <option value="40mm">Polyfan 40mm</option><option value="50mm">Polyfan 50mm</option>
                  </select>
                </div>
                <div className="space-y-1 w-full">
                  <label className="text-[9px] text-[#e2ff00] uppercase font-bold tracking-widest ml-1">Capa Fondo (Base)</label>
                  <select value={crEspesorFondo} onChange={e => setCrEspesorFondo(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none focus:border-[#e2ff00] appearance-none">
                    <option value="Ninguno">Sin Fondo</option><option value="20mm">Polyfan 20mm</option>
                    <option value="30mm">Polyfan 30mm</option><option value="40mm">Polyfan 40mm</option>
                    <option value="50mm">Polyfan 50mm</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 w-full border-t border-[#222] pt-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-400 uppercase font-bold tracking-widest ml-1">Condiciones</label>
                  <select value={crExterior} onChange={e => setCrExterior(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none focus:border-[#e2ff00] appearance-none">
                    <option value="No">Para Interior</option><option value="Si">Para Exterior (Laca + Masilla)</option>
                  </select>
                </div>
                <select value={crLeds} onChange={e => setCrLeds(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none appearance-none">
                  <option value="No">Sin Luces</option><option value="Si">Con Retroiluminación LED (Inlc. 3D)</option>
                </select>
                <select value={crInstalacion} onChange={e => setCrInstalacion(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none appearance-none">
                  <option value="Sin colocación">Sin Colocación</option><option value="Instalación Básica">Instalación Básica</option><option value="Compleja / Altura">Instalación Altura / Compleja</option>
                </select>
              </div>
              <div className="space-y-3 pt-4 border-t border-[#222]">
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-400 uppercase font-bold tracking-widest ml-1">Diseño (Capa Frente)</label>
                  <select value={crDensidad} onChange={e => setCrDensidad(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none appearance-none">
                    <option value="40">Texto Suelto (Alta Merma)</option><option value="65">Logo Estándar (Merma Media)</option><option value="100">Frente Pleno / Escudo (Sin Merma)</option>
                  </select>
                </div>
                <select value={crComplejidad} onChange={e => setCrComplejidad(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none appearance-none">
                  <option value="1.5">Baja (1.5h/m²)</option><option value="3">Normal (3h/m²)</option><option value="5">Alta (5h/m²)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            {m2Totales > 0 ? (
              <div className="bg-[#111] rounded-2xl border border-[#333] overflow-hidden animate-pop shadow-[0_10px_40px_rgba(0,0,0,0.5)] md:sticky md:top-10">
                <div className="bg-[#e2ff00] p-4 text-center">
                  <p className="text-black font-black uppercase tracking-widest text-[11px]">Cálculo Matemático</p>
                </div>
                <div className="p-6 md:p-8 space-y-4 text-sm">
                  <div className="flex justify-between border-b border-[#222] pb-3">
                    <span className="text-gray-400">Placas Frente:</span> 
                    <span className="text-white font-bold">{placasEstimadasFrente} (de {crEspesorFrente})</span>
                  </div>
                  {crEspesorFondo !== 'Ninguno' && (
                    <div className="flex justify-between border-b border-[#222] pb-3">
                      <span className="text-gray-400">Placas Fondo:</span> 
                      <span className="text-white font-bold">{placasEstimadasFondo} (de {crEspesorFondo})</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-gray-400 text-sm md:text-base font-bold mt-2">PRECIO FINAL:</span> 
                    <div className="flex items-center">
                      <span className="text-[#e2ff00] text-3xl md:text-4xl font-black mr-2">$</span>
                      <input 
                        type="number" 
                        value={precioAjustado} 
                        onChange={(e) => setPrecioAjustado(e.target.value)} 
                        className="bg-transparent border-b-2 border-dashed border-[#333] focus:border-[#e2ff00] text-[#e2ff00] text-3xl md:text-4xl font-black w-32 md:w-48 outline-none text-right transition-colors"
                      />
                    </div>
                  </div>
                  
                </div>
                <div className="p-4 md:p-6 bg-[#0a0a0a] flex flex-col gap-3">
                  <button onClick={exportarTicketRapido} className="w-full bg-[#333] text-white text-[10px] tracking-widest font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#444] transition-all">
                    <IconImage /> Exportar Ticket PNG
                  </button>
                  <button onClick={enviarWhatsAppEstimacion} className="w-full bg-[#1a2e1a] text-green-400 text-[10px] tracking-widest font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 border border-green-900/50 hover:bg-[#203a20] transition-all">
                    <IconWhatsApp /> Enviar Estimación
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex h-full min-h-[400px] border-2 border-dashed border-[#333] rounded-[2rem] flex-col items-center justify-center text-gray-600">
                <IconZap size={48} className="mb-4 opacity-50" />
                <p className="text-sm font-bold uppercase tracking-widest text-center px-8">Completá las medidas para<br/>ver el cálculo inteligente.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {modoCotizador === 'Beta' && (
        <div className="w-full flex flex-col md:flex-row gap-8 items-start animate-stagger">
          <div className="w-full md:w-[45%] space-y-6">
            <div className="glass-panel border border-purple-500/50 p-6 md:p-8 rounded-[2rem] space-y-4 shadow-[0_0_25px_rgba(147,51,234,0.15)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              
              <div className="text-center md:text-left mb-6">
                <h3 className="text-white font-black text-lg uppercase tracking-widest flex items-center gap-2">
                  <IconSparkles /> Motor IA
                </h3>
                <p className="text-[10px] text-purple-400 uppercase tracking-widest mt-1">Cálculo Base Fija + Inteligencia Artificial</p>
              </div>

              <Input label="Nombre del Cliente" value={betaCliente} onChange={setBetaCliente} placeholder="Ej: Tienda Arena" />
              <Input label="Detalle Breve del Trabajo" value={betaTrabajo} onChange={setBetaTrabajo} placeholder="Ej: Corpóreo iluminado para fachada" />
              
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" label="Ancho (Metros)" value={betaAncho} onChange={setBetaAncho} placeholder="Ej: 1.70" />
                <Input type="number" label="Alto (Metros)" value={betaAlto} onChange={setBetaAlto} placeholder="Ej: 1.50" />
              </div>
              
              <div className="space-y-3 bg-[#0a0a0a]/50 p-4 rounded-xl border border-[#222]">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] text-purple-400 uppercase font-bold tracking-widest">Placas a Utilizar</label>
                    <button onClick={handleAddBetaPlaca} className="text-[9px] bg-purple-600/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors">
                        + Agregar otra placa
                    </button>
                </div>
                {betaPlacas.map((placa, idx) => (
                    <div key={placa.id} className="flex gap-2 items-center">
                        <select value={placa.espesor} onChange={e => handleUpdateBetaPlaca(placa.id, 'espesor', e.target.value)} className="flex-1 glass-panel bg-[#111] border border-[#333] rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500 appearance-none">
                            <option value="20mm">Polyfan 20mm</option><option value="30mm">Polyfan 30mm</option>
                            <option value="40mm">Polyfan 40mm</option><option value="50mm">Polyfan 50mm</option>
                        </select>
                        <input type="number" value={placa.cantidad} onChange={e => handleUpdateBetaPlaca(placa.id, 'cantidad', e.target.value)} placeholder="Cant." className="w-20 glass-panel bg-[#111] border border-[#333] rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500 text-center" />
                        {betaPlacas.length > 1 && (
                            <button onClick={() => handleRemoveBetaPlaca(placa.id)} className="w-8 h-8 flex items-center justify-center bg-red-900/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors">X</button>
                        )}
                    </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 w-full">
                  <label className="text-[9px] text-purple-400 uppercase font-bold tracking-widest ml-1">Exterior (Laca/Masilla)</label>
                  <select value={betaExterior} onChange={e => setBetaExterior(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none focus:border-purple-500 appearance-none">
                    <option value="No">No (Interior)</option><option value="Si">Sí (Exterior)</option>
                  </select>
                </div>
                <div className="space-y-1 w-full">
                  <label className="text-[9px] text-purple-400 uppercase font-bold tracking-widest ml-1">Lleva Vinilo Impreso</label>
                  <select value={betaVinilo} onChange={e => setBetaVinilo(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none focus:border-purple-500 appearance-none">
                    <option value="No">No</option><option value="Si">Sí ($55k x m²)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1 w-full">
                <label className="text-[9px] text-purple-400 uppercase font-bold tracking-widest ml-1">Lleva Luz LED</label>
                <select value={betaLuz} onChange={e => setBetaLuz(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none focus:border-purple-500 appearance-none">
                  <option value="No">No</option><option value="Si">Sí</option>
                </select>
              </div>
              
              {betaLuz === 'Si' && (
                <div className="grid grid-cols-2 gap-4 animate-premium">
                  <Input type="number" label="Metros de Tira LED" value={betaMetrosLed} onChange={setBetaMetrosLed} placeholder="Ej: 5" />
                  <Input type="number" label="Metros de Cable Cristal" value={betaMetrosCable} onChange={setBetaMetrosCable} placeholder="Ej: 3" />
                </div>
              )}

              <div className="space-y-1 w-full">
                <label className="text-[9px] text-purple-400 uppercase font-bold tracking-widest ml-1">Nivel de Instalación</label>
                <select value={betaInstalacion} onChange={e => setBetaInstalacion(e.target.value)} className="w-full glass-panel bg-[#111] border border-[#333] rounded-xl p-3.5 text-sm text-white outline-none focus:border-purple-500 appearance-none">
                  <option value="Sin colocación">Sin Colocación</option><option value="Normal">Instalación Normal</option><option value="Altura">Instalación en Altura</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input label="Tiempo Estimado" value={betaTiempo} onChange={setBetaTiempo} placeholder="10 a 15 días" />
                <Input label="Formas de Pago" value={betaPagos} onChange={setBetaPagos} placeholder="50% anticipo" />
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-[#222]">
                <span className="text-gray-400 text-sm md:text-base font-bold mt-2">PRECIO FINAL:</span> 
                <div className="flex items-center">
                  <span className="text-purple-400 text-3xl md:text-4xl font-black mr-2">$</span>
                  <input 
                    type="number" 
                    value={betaPrecioAjustado} 
                    onChange={(e) => setBetaPrecioAjustado(e.target.value)} 
                    className="bg-transparent border-b-2 border-dashed border-[#333] focus:border-purple-500 text-purple-400 text-3xl md:text-4xl font-black w-32 md:w-48 outline-none text-right transition-colors"
                  />
                </div>
              </div>
              
              <button onClick={generarPropuestaIA} disabled={generandoIA} className="w-full bg-purple-600 text-white font-black uppercase py-4 rounded-xl mt-4 hover:scale-[1.02] transition-all flex justify-center items-center gap-2">
                <IconSparkles /> {generandoIA ? 'Procesando...' : 'Calcular y Generar Propuesta IA'}
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-[55%]">
            {betaRespuestaIA ? (
              <div className="glass-panel border border-[#333] p-8 rounded-[2rem] relative overflow-hidden animate-pop shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                 <div className="absolute top-0 right-0 bg-purple-600 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl">BETA AI POWERED</div>
                 <div className="flex justify-between items-center mb-6 border-b border-[#222] pb-4">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Propuesta Comercial</span>
                    <span className="text-purple-400 text-2xl font-black">${Number(betaPrecioAjustado).toLocaleString('es-AR')}</span>
                 </div>
                 <div className="text-gray-300 text-sm leading-relaxed space-y-4 mb-8" dangerouslySetInnerHTML={{ __html: betaRespuestaIA }} />
                 <div className="flex flex-col gap-3">
                   <button onClick={exportarTicketBeta} className="w-full bg-[#111] border border-purple-500/50 text-purple-400 text-[10px] tracking-widest font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-900/20 transition-all">
                      <IconImage /> Descargar Propuesta en PNG
                   </button>
                   <button onClick={guardarComoLead} className="w-full bg-[#1a2e1a] border border-green-500/50 text-green-400 text-[10px] tracking-widest font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#203a20] transition-all">
                      <IconUsers /> Guardar como Lead Activo
                   </button>
                 </div>
              </div>
            ) : (
              <div className="hidden md:flex h-full min-h-[500px] border-2 border-dashed border-[#333] rounded-[2rem] flex-col items-center justify-center text-gray-600">
                <IconSparkles size={48} className="mb-4 opacity-50 text-purple-900" />
                <p className="text-sm font-bold uppercase tracking-widest text-center px-8">Completá los datos y dejá que<br/>la IA redacte la propuesta.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
