import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/rm/HomePage';
import ServicosPage from '@/pages/rm/ServicosPage';
import ProjetosPage from '@/pages/rm/ProjetosPage';
import PlanosPage from '@/pages/rm/PlanosPage';
import SobrePage from '@/pages/rm/SobrePage';
import ContatoPage from '@/pages/rm/ContatoPage';
import { PoliticaPrivacidadePage, TermosServicoPage } from '@/pages/rm/LegalPages';
export default function App() {
 return <BrowserRouter><ScrollToTop/><Routes>
 <Route path="/" element={<HomePage/>}/><Route path="/servicos" element={<ServicosPage/>}/>
 <Route path="/projetos" element={<ProjetosPage/>}/><Route path="/planos" element={<PlanosPage/>}/>
 <Route path="/sobre" element={<SobrePage/>}/><Route path="/contato" element={<ContatoPage/>}/>
 <Route path="/politica-de-privacidade" element={<PoliticaPrivacidadePage/>}/>
 <Route path="/termos-de-servico" element={<TermosServicoPage/>}/>
 {['/plans','/shop'].map(path=><Route key={path} path={path} element={<Navigate to="/planos" replace/>}/>)}
 {['/login','/cadastro','/subscriptions','/pedido-confirmado'].map(path=><Route key={path} path={path} element={<Navigate to="/contato" replace/>}/>)}
 <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></BrowserRouter>;
}
