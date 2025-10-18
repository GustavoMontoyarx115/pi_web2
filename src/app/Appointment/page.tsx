"use client";

import { useEffect, useState } from "react";

type Appointment = {
  id?: number;
  nombre: string;
  correo?: string;
  fecha: string; // "YYYY-MM-DD"
  hora: string;  // "HH:mm"
  medico: string;
  clinicId?: number | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
const APPOINTMENTS_URL = `${API_BASE}/appointments`; // tu endpoint: /api/Appointments

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const initialForm: Appointment = {
    nombre: "",
    correo: "",
    fecha: "",
    hora: "",
    medico: "",
    clinicId: null,
  };
  const [form, setForm] = useState<Appointment>(initialForm);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchList();
    // auto-hide toasts
    const t = setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  async function fetchList() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(APPOINTMENTS_URL);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setAppointments(data);
    } catch (err: any) {
      console.error(err);
      setError("No se pudieron cargar las citas. Revisa tu backend o CORS.");
    } finally {
      setLoading(false);
    }
  }

  function validate(): string | null {
    if (!form.nombre || form.nombre.trim().length < 3) return "El nombre es obligatorio (mín 3 caracteres).";
    if (!form.fecha) return "La fecha es obligatoria.";
    if (!form.hora) return "La hora es obligatoria.";
    if (!form.medico || form.medico.trim().length < 3) return "El médico es obligatorio.";
    return null;
  }

  async function handleCreate(e?: React.FormEvent) {
    e?.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const payload = { ...form };
      // backend puede requerir hora con segundos; si necesitas "HH:mm:ss" puedes transformar:
      // payload.hora = payload.hora.length === 5 ? `${payload.hora}:00` : payload.hora;
      const res = await fetch(APPOINTMENTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Error ${res.status}`);
      }
      const created = await res.json();
      setSuccess("Cita creada correctamente.");
      setForm(initialForm);
      await fetchList();
    } catch (err: any) {
      console.error(err);
      setError("Error al crear la cita.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(a: Appointment) {
    setIsEditing(true);
    setEditingId(a.id ?? null);
    setForm({
      nombre: a.nombre,
      correo: a.correo ?? "",
      fecha: a.fecha,
      hora: a.hora,
      medico: a.medico,
      clinicId: a.clinicId ?? null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleUpdate(e?: React.FormEvent) {
    e?.preventDefault();
    if (editingId == null) return;
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${APPOINTMENTS_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Error ${res.status}`);
      }
      setSuccess("Cita actualizada correctamente.");
      setIsEditing(false);
      setEditingId(null);
      setForm(initialForm);
      await fetchList();
    } catch (err: any) {
      console.error(err);
      setError("Error al actualizar la cita.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id?: number) {
    if (!confirm("¿Eliminar esta cita?")) return;
    try {
      const res = await fetch(`${APPOINTMENTS_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setSuccess("Cita eliminada.");
      await fetchList();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar la cita.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario (col 1) */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4"> {isEditing ? "Editar cita" : "Agendar cita"} </h2>

          {error && <div className="mb-3 text-sm text-red-700 bg-red-100 p-2 rounded">{error}</div>}
          {success && <div className="mb-3 text-sm text-green-800 bg-green-100 p-2 rounded">{success}</div>}

          <form onSubmit={isEditing ? handleUpdate : handleCreate} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Nombre</label>
              <input
                className="w-full px-3 py-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Nombre completo"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Correo (opcional)</label>
              <input
                className="w-full px-3 py-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
                placeholder="correo@ejemplo.com"
                type="email"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Fecha</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Hora</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  value={form.hora}
                  onChange={(e) => setForm({ ...form, hora: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Médico</label>
              <input
                className="w-full px-3 py-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                value={form.medico}
                onChange={(e) => setForm({ ...form, medico: e.target.value })}
                placeholder="Nombre del médico"
                required
              />
            </div>

            {/* clinicId si se necesita, por ahora lo ocultamos */}
            {/* <div>
              <label className="block text-sm mb-1">Clinic ID</label>
              <input ... />
            </div> */}

            <div className="flex items-center gap-3 mt-2">
              <button
                disabled={submitting}
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
              >
                {submitting ? (isEditing ? "Actualizando..." : "Guardando...") : isEditing ? "Actualizar" : "Agendar"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingId(null);
                    setForm(initialForm);
                  }}
                  className="px-3 py-2 border rounded"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Listado (col 2 & 3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Citas agendadas</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setForm(initialForm);
                  setIsEditing(false);
                  setEditingId(null);
                }}
                className="px-3 py-2 text-sm rounded border bg-white dark:bg-slate-800"
              >
                Nuevo
              </button>
              <button
                onClick={fetchList}
                className="px-3 py-2 text-sm rounded border bg-white dark:bg-slate-800"
              >
                Refrescar
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-8 rounded bg-white dark:bg-slate-800 shadow text-center">Cargando...</div>
          ) : appointments.length === 0 ? (
            <div className="p-6 rounded bg-white dark:bg-slate-800 shadow text-center">No hay citas registradas</div>
          ) : (
            <div className="grid gap-4">
              {appointments.map((a) => (
                <article key={a.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{a.nombre}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-300">
                      {a.fecha} — {a.hora}
                    </p>
                    <p className="mt-2 text-sm">{a.medico}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(a)}
                      className="px-3 py-1 text-sm rounded bg-emerald-600 text-white"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="px-3 py-1 text-sm rounded bg-red-600 text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
