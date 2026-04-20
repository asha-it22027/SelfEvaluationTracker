/**
 * ═══════════════════════════════════════════════
 * profile.js — User profile management
 * ═══════════════════════════════════════════════
 */

const Profile = (() => {

  let currentAvatarData = null;

  async function render() {
    const user = await Session.getUser();
    if (!user) return;

    const isBn = (Lang.get() === 'bn');
    
    // Static UI Translation
    const ui = {
      title: isBn ? "প্রোফাইল" : "Profile",
      sub: isBn ? "আপনার অ্যাকাউন্ট এবং পরিসংখ্যান" : "Your account & statistics",
      editTitle: isBn ? "প্রোফাইল এডিট করুন" : "Edit profile",
      labelAvatar: isBn ? "প্রোফাইল ছবি" : "Profile Picture",
      labelName: isBn ? "পুরো নাম" : "Full name",
      labelAge: isBn ? "বয়স" : "Age",
      labelGoal: isBn ? "প্রধান লক্ষ্য" : "Primary goal",
      labelBio: isBn ? "বায়ো" : "Bio",
      placeholderBio: isBn ? "আপনার সম্পর্কে কিছু বলুন..." : "Tell us something about yourself...",
      btnSave: isBn ? "পরিবর্তন সংরক্ষণ করুন" : "Save Changes",
      btnDelete: isBn ? "অ্যাকাউন্ট মুছে ফেলুন" : "Delete Account"
    };

    const elMap = {
      'profile-title-text': ui.title,
      'profile-sub-text': ui.sub,
      'edit-profile-title': ui.editTitle,
      'label-avatar': ui.labelAvatar,
      'label-name': ui.labelName,
      'label-age': ui.labelAge,
      'label-goal': ui.labelGoal,
      'label-bio': ui.labelBio,
      'btn-save-profile': ui.btnSave,
      'btn-delete-account': ui.btnDelete
    };

    Object.entries(elMap).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });

    const bioInput = document.getElementById('edit-bio');
    if (bioInput) bioInput.placeholder = ui.placeholderBio;

    // Update Goal Dropdown Options
    const goalSelect = document.getElementById('edit-goal');
    if (goalSelect) {
      const goals = {
        'Study': isBn ? "পড়াশোনার অভ্যাস উন্নত করা" : "Improve study habits",
        'Focus': isBn ? "গভীর মনোযোগ বৃদ্ধি" : "Build deep focus",
        'Consistency': isBn ? "ধারাবাহিকতা বজায় রাখা" : "Be more consistent",
        'Logic': isBn ? "যুক্তি ও বুদ্ধি তীক্ষ্ণ করা" : "Sharpen logic & reasoning",
        'Health': isBn ? "স্বাস্থ্য ও শক্তি উন্নত করা" : "Improve health & energy"
      };
      Array.from(goalSelect.options).forEach(opt => {
        if (goals[opt.value]) opt.textContent = goals[opt.value];
      });
    }

    currentAvatarData = user.avatar || '';
    _renderProfileCard(user, isBn);
    _fillForm(user);
    _updateAvatarPreview();
  }

  function _renderProfileCard(user, isBn) {
    const el = document.getElementById('profile-info-card');
    if (!el) return;

    const initials = (user.name || 'U').split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
    
    const avatarHtml = (user.avatar && user.avatar.length > 10)
      ? `<img src="${user.avatar}" style="width:100%; height:100%; object-fit:cover" />`
      : `<span style="display:flex; align-items:center; justify-content:center; width:100%; height:100%; background:var(--accent); color:#fff; font-size:32px; font-weight:700">${initials}</span>`;

    const goals = {
      'Study': isBn ? 'পড়াশোনা' : 'Study',
      'Focus': isBn ? 'মনোযোগ' : 'Focus',
      'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
      'Logic': isBn ? 'যুক্তি' : 'Logic',
      'Health': isBn ? 'স্বাস্থ্য' : 'Health'
    };

    const ageSuffix = isBn ? " বছর" : " years";
    const bioLabel = isBn ? "বায়ো" : "Bio";
    const noBio = isBn ? "এখনো কোনো বায়ো যোগ করা হয়নি।" : "No bio added yet.";
    const joinedLabel = isBn ? "যোগদান করেছেন" : "Joined";

    el.innerHTML = `
      <div style="display:flex; align-items:center; gap:20px; margin-bottom:20px">
        <div style="width:80px; height:80px; border-radius:50%; background:var(--surface); display:flex; align-items:center; justify-content:center; overflow:hidden; border:3px solid var(--border-hi)">
          ${avatarHtml}
        </div>
        <div>
          <h2 style="margin:0">${user.name}</h2>
          <p style="color:var(--muted); margin:5px 0">${user.email}</p>
          <div style="display:flex; gap:10px; margin-top:10px">
            <span class="chip">${goals[user.goal] || user.goal}</span>
            <span class="chip">${user.age}${ageSuffix}</span>
          </div>
        </div>
      </div>
      <div style="padding:15px; background:rgba(255,255,255,0.03); border-radius:12px; font-size:14px">
        <strong style="color:var(--accent2)">${bioLabel}:</strong> ${user.bio || noBio}
      </div>
      <p style="font-size:12px; color:var(--hint); margin-top:15px"><strong>${joinedLabel}:</strong> ${user.joinDate}</p>
    `;

    // Also update Navbar avatar if possible
    const navAvatar = document.getElementById('nav-avatar');
    if (navAvatar) {
      navAvatar.innerHTML = (user.avatar && user.avatar.length > 10)
        ? `<img src="${user.avatar}" style="width:100%; height:100%; object-fit:cover; border-radius:50%" />` 
        : initials;
    }
  }

  function _fillForm(user) {
    const fields = {
      'edit-name': user.name,
      'edit-age': user.age,
      'edit-goal': user.goal,
      'edit-bio': user.bio
    };

    for (const [id, val] of Object.entries(fields)) {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    }
    
    // Reset file input
    const fileInput = document.getElementById('edit-avatar-input');
    if (fileInput) fileInput.value = '';
  }

  function handleAvatarChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Optional: Add size check (e.g., 2MB)
    if (file.size > 2 * 1024 * 1024) {
      const isBn = (Lang.get() === 'bn');
      alert(isBn ? 'ফাইলটি অনেক বড়! ২ মেগাবাইটের কম সাইজের ছবি আপলোড করুন।' : 'File too large! Please upload under 2MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      currentAvatarData = e.target.result;
      _updateAvatarPreview();
    };
    reader.readAsDataURL(file);
  }

  function _updateAvatarPreview() {
    const preview = document.getElementById('edit-avatar-preview');
    if (!preview) return;
    
    if (currentAvatarData && currentAvatarData.length > 10) {
      preview.innerHTML = `<img src="${currentAvatarData}" style="width:100%; height:100%; object-fit:cover" />`;
    } else {
      preview.innerHTML = `<span style="font-size:24px; color:var(--muted)">👤</span>`;
    }
  }

  async function save() {
    const user = await Session.getUser();
    if (!user) return;

    const isBn = (Lang.get() === 'bn');

    const data = {
      name: document.getElementById('edit-name').value,
      age: document.getElementById('edit-age').value,
      goal: document.getElementById('edit-goal').value,
      bio: document.getElementById('edit-bio').value,
      avatar: currentAvatarData
    };

    console.log('Saving profile with avatar data length:', data.avatar ? data.avatar.length : 0);

    const ok = await DB.updateUser(user.email, data);
    if (ok) {
      showToast(isBn ? 'প্রোফাইল আপডেট হয়েছে!' : 'Profile updated!');
      await Session.getUser(true); // Force refresh cache
      await App.updateGlobalNav(); // Ensure nav is updated too
      render();
    } else {
      showToast(isBn ? 'আপডেট ব্যর্থ হয়েছে।' : 'Update failed.', 'var(--danger)');
    }
  }

  function deleteAccount() {
    const isBn = (Lang.get() === 'bn');
    const msg = isBn 
      ? 'আপনি কি নিশ্চিত যে আপনি আপনার অ্যাকাউন্ট মুছে ফেলতে চান? এটি আর ফিরিয়ে আনা সম্ভব নয়।' 
      : 'Are you sure you want to delete your account? This cannot be undone.';
    const soon = isBn ? 'মুছে ফেলার ফিচারটি শীঘ্রই আসছে।' : 'Delete feature coming soon.';
    
    if (confirm(msg)) {
      alert(soon);
    }
  }

  return { render, save, deleteAccount, handleAvatarChange };
})();
