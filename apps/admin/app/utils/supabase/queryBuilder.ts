import { supabaseAdmin } from './supabaseAdmin';

export class SupabaseQueryBuilder<T> {
  constructor(private table: string) {}

  async findById(id: string) {
    const { data, error } = await supabaseAdmin
    .from(this.table)
    .select('*')
    .eq('id', id)
    .single();

    if (error) throw error;
    return data as T;
  }

  async findAll() {
    const { data, error } = await supabaseAdmin
    .from(this.table)
    .select('*');

    if (error) throw error;
    return data as T[];
  }

  async findByCondition(column: string, value: any) {
    const { data, error } = await supabaseAdmin
    .from(this.table)
    .select('*')
    .eq(column, value);

    if (error) throw error;
    return data as T[];
  }

  async findOneByCondition(column: string, value: any) {
    const { data, error } = await supabaseAdmin
    .from(this.table)
    .select('*')
    .eq(column, value)
    .maybeSingle();

    if (error) throw error;
    return data as T | null;
  }

  async create(payload: Partial<T>) {
    const { data, error } = await supabaseAdmin
    .from(this.table)
    .insert([payload])
    .select()
    .single();

    if (error) throw error;
    return data as T;
  }

  async update(id: string, payload: Partial<T>) {
    const { data, error } = await supabaseAdmin
    .from(this.table)
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

    if (error) throw error;
    return data as T;
  }

  async delete(id: string) {
    const { error } = await supabaseAdmin
    .from(this.table)
    .delete()
    .eq('id', id);

    if (error) throw error;
    return true;
  }

  async findPaginated({
    page = 1,
    limit = 10,
    search = '',
    searchFields = ['title', 'description'],
    sortBy = 'created_at',
    sortOrder = 'desc',
    filters = {}
  }: {
    page?: number;
    limit?: number;
    search?: string;
    searchFields?: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: Record<string, any>;
  }) {
    let query = supabaseAdmin
    .from(this.table)
    .select('*', { count: 'exact' });

    // Apply search
    if (search) {
      const searchQuery = searchFields
      .map(field => `${field}.ilike.%${search}%`)
      .join(',');
      query = query.or(searchQuery);
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data as T[],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    };
  }
  
  async count(filters: Record<string, any> = {}) {
    let query = supabaseAdmin
    .from(this.table)
    .select('*', { count: 'exact', head: true });

    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { count, error } = await query;

    if (error) throw error;
    return count || 0;
  }

  async increment(id: string, field: string, amount = 1) {
    const { error } = await supabaseAdmin.rpc(`increment_${this.table}_${field}`, {
      row_id: id,
      increment_by: amount
    });

    if (error) throw error;
    return true;
  }

  async bulkCreate(items: Partial<T>[]) {
    const { data, error } = await supabaseAdmin
    .from(this.table)
    .insert(items)
    .select();

    if (error) throw error;
    return data as T[];
  }

  async bulkUpdate(updates: Array<{ id: string; data: Partial<T> }>) {
    const promises = updates.map(({ id, data }) => this.update(id, data));
    return Promise.all(promises);
  }

}