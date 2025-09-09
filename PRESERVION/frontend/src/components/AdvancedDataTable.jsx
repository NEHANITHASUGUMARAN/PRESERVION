import React, { useState, useMemo } from 'react';

const AdvancedDataTable = ({ data, columns, title, onRowClick }) => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );

    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (typeof aVal === 'string') {
          return sortDirection === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }

    return filtered;
  }, [data, filterText, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return '#4caf50';
      case 'risky': return '#ff9800';
      case 'spoiled': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #4caf50, #2e7d32, #4caf50)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 3s ease-in-out infinite'
      }} />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <h3 style={{
          margin: '0',
          fontSize: '1.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {title}
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={{
                padding: '10px 15px 10px 40px',
                border: '2px solid #e0e0e0',
                borderRadius: '25px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4caf50';
                e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <span style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999',
              fontSize: '16px'
            }}>🔍</span>
          </div>
        </div>
      </div>

      <div style={{
        overflowX: 'auto',
        borderRadius: '15px',
        border: '1px solid #e0e0e0'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: 'white'
        }}>
          <thead>
            <tr style={{
              background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
              borderBottom: '2px solid #e0e0e0'
            }}>
              {columns.map(column => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  style={{
                    padding: '15px 20px',
                    textAlign: 'left',
                    fontWeight: '700',
                    fontSize: '14px',
                    color: '#495057',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(76, 175, 80, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {column.label}
                    {sortField === column.key && (
                      <span style={{ fontSize: '12px' }}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={row.id || index}
                onClick={() => onRowClick?.(row)}
                style={{
                  borderBottom: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease',
                  cursor: onRowClick ? 'pointer' : 'default'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(76, 175, 80, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                {columns.map(column => (
                  <td
                    key={column.key}
                    style={{
                      padding: '15px 20px',
                      fontSize: '14px',
                      color: '#495057'
                    }}
                  >
                    {column.key === 'status' ? (
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: `${getStatusColor(row[column.key])}20`,
                        color: getStatusColor(row[column.key]),
                        border: `1px solid ${getStatusColor(row[column.key])}40`
                      }}>
                        {row[column.key]}
                      </span>
                    ) : column.key === 'quality' ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: getStatusColor(row[column.key])
                        }} />
                        {row[column.key]}
                      </div>
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        padding: '15px 0'
      }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} entries
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              border: '1px solid #e0e0e0',
              background: currentPage === 1 ? '#f5f5f5' : 'white',
              borderRadius: '8px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              color: currentPage === 1 ? '#999' : '#495057'
            }}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                background: currentPage === page ? '#4caf50' : 'white',
                color: currentPage === page ? 'white' : '#495057',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              border: '1px solid #e0e0e0',
              background: currentPage === totalPages ? '#f5f5f5' : 'white',
              borderRadius: '8px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              color: currentPage === totalPages ? '#999' : '#495057'
            }}
          >
            Next
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default AdvancedDataTable;
