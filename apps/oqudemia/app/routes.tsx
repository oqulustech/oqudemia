import { type RouteConfig, route } from '@react-router/dev/routes';
export default [
  route('app', './app.tsx'),
  route('login', './shared/components/Login.tsx'),
  route('admission', './pages/AdmissionPage.tsx'),
  route('examination', './pages/ExaminationPage.tsx'),
  route('fee', './pages/FeePage.tsx'),
  route('finance', './pages/FinancePage.tsx'),
  route('human-resource', './pages/HumanResourcePage.tsx'),
  route('hostel', './pages/HostelPage.tsx'),
  route('inventory', './pages/InventoryPage.tsx'),
  route('library', './pages/LibraryPage.tsx'),
  route('mis', './pages/MISPage.tsx'),
  route('pages', './pages/PagesPage.tsx'),
  route('more', './pages/MorePage.tsx'),
  route('components', './pages/ComponentPage.tsx'),
  route('form', './featured/component/Form.tsx'),
  route('table', './featured/component/Table.tsx'),
  route('alert', './featured/component/Alert.tsx'),
  // Catch-all: show login for any unknown/random URL
  // route('*', './shared/components/Login.tsx'),
] satisfies RouteConfig;