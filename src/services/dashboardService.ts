import { DashboardData } from '../types/dashboard';

class DashboardService {
  private baseUrl = '/api/dashboard';

  async getDashboardData(): Promise<DashboardData> {
    try {
      const response = await fetch(`${this.baseUrl}/dashboard-data`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Datos obtenidos de la base de datos');
        console.log('🔍 Primer mantenimiento en servicio:', data.proximosMantenimientos?.[0]);
        return data;
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Data no encontrada');
    }
  }

  async getEquipmentData() {
    try {
      const response = await fetch(`${this.baseUrl}/equipment`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Equipos obtenidos de la base de datos');
        return data;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    } catch (error) {
      console.error('Error fetching equipment data:', error);
      throw new Error('Data no encontrada');
    }
  }

  async getInventoryData() {
    try {
      const response = await fetch(`${this.baseUrl}/inventory`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Inventario obtenido de la base de datos');
        return data;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      throw new Error('Data no encontrada');
    }
  }

  async getMaintenanceData() {
    try {
      const response = await fetch(`${this.baseUrl}/maintenance`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Mantenimientos obtenidos de la base de datos');
        return data;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    } catch (error) {
      console.error('Error fetching maintenance data:', error);
      throw new Error('Data no encontrada');
    }
  }

  async getAnalyticsData() {
    try {
      const response = await fetch(`${this.baseUrl}/analytics`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Análisis obtenidos de la base de datos');
        return data;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      throw new Error('Data no encontrada');
    }
  }

  async getTopEquipment() {
    try {
      const response = await fetch(`${this.baseUrl}/top-equipment`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Equipos top obtenidos de la base de datos');
        return data;
      }
      console.error(`Error HTTP ${response.status}: ${response.statusText}`);
      const errorText = await response.text();
      console.error('Response body:', errorText);
      throw new Error(`Error HTTP: ${response.status}`);
    } catch (error) {
      console.error('Error fetching top equipment data:', error);
      throw new Error('Data no encontrada');
    }
  }
}

export const dashboardService = new DashboardService();
